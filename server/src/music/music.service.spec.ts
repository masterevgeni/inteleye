import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MusicService } from './music.service';
import { Song } from './schemas/song.schema';

describe('MusicService', () => {
  let service: MusicService;
  let model: Model<Song>;

  const mockSong = {
    _id: 'mockId',
    title: 'Test Song',
    artist: 'Test Artist',
    genre: 'Rock',
    duration: 240,
    releaseYear: 2020,
    playCount: 0,
    lastPlayedAt: new Date(),
    save: jest.fn(),
  };

  const mockSongModel = {
    countDocuments: jest.fn(),
    insertMany: jest.fn(),
    aggregate: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicService,
        {
          provide: getModelToken(Song.name),
          useValue: mockSongModel,
        },
      ],
    }).compile();

    service = module.get<MusicService>(MusicService);
    model = module.get<Model<Song>>(getModelToken(Song.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should seed database when empty', async () => {
      mockSongModel.countDocuments.mockReturnValue({
        exec: jest.fn().mockResolvedValue(0),
      });
      mockSongModel.insertMany.mockResolvedValue([]);

      await service.onModuleInit();

      expect(mockSongModel.countDocuments).toHaveBeenCalled();
      expect(mockSongModel.insertMany).toHaveBeenCalled();
    });

    it('should not seed database when not empty', async () => {
      mockSongModel.countDocuments.mockReturnValue({
        exec: jest.fn().mockResolvedValue(5),
      });

      await service.onModuleInit();

      expect(mockSongModel.countDocuments).toHaveBeenCalled();
      expect(mockSongModel.insertMany).not.toHaveBeenCalled();
    });
  });

  describe('getDashboardStats', () => {
    beforeEach(() => {
      mockSongModel.aggregate.mockImplementation((pipeline) => ({
        exec: jest.fn().mockImplementation(() => {
          const firstStage = pipeline[0];
          
          if (firstStage.$group && firstStage.$group._id === null) {
            return Promise.resolve([{
              totalSongs: 10,
              avgDuration: 240,
              totalUniqueArtists: 5,
            }]);
          } else if (firstStage.$group && firstStage.$group._id === '$genre') {
            return Promise.resolve([
              { name: 'Rock', value: 5 },
              { name: 'Pop', value: 3 },
            ]);
          } else if (firstStage.$group && firstStage.$group._id === '$artist') {
            return Promise.resolve([
              { name: 'Artist 1', songs: 3 },
              { name: 'Artist 2', songs: 2 },
            ]);
          } else if (firstStage.$project && firstStage.$project.decade) {
            return Promise.resolve([
              { name: '2020s', count: 7 },
              { name: '2010s', count: 3 },
            ]);
          }
          
          return Promise.resolve([]);
        }),
      }));

      mockSongModel.findOne.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockSong),
        }),
      });
    });

    it('should return dashboard statistics', async () => {
      const result = await service.getDashboardStats();

      expect(result).toEqual({
        kpis: {
          totalSongs: 10,
          avgDuration: 240,
          totalUniqueArtists: 5,
        },
        genreDistribution: [
          { name: 'Rock', value: 5 },
          { name: 'Pop', value: 3 },
        ],
        topArtists: [
          { name: 'Artist 1', songs: 3 },
          { name: 'Artist 2', songs: 2 },
        ],
        songsByDecade: [
          { name: '2020s', count: 7 },
          { name: '2010s', count: 3 },
        ],
        nowPlaying: mockSong,
      });

      expect(mockSongModel.aggregate).toHaveBeenCalledTimes(4);
      expect(mockSongModel.findOne).toHaveBeenCalled();
    });

    it('should handle empty dataset', async () => {
      mockSongModel.aggregate.mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      });

      mockSongModel.findOne.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      const result = await service.getDashboardStats();

      expect(result.kpis).toEqual({
        totalSongs: 0,
        avgDuration: 0,
        totalUniqueArtists: 0,
      });
      expect(result.genreDistribution).toEqual([]);
      expect(result.topArtists).toEqual([]);
      expect(result.songsByDecade).toEqual([]);
      expect(result.nowPlaying).toBeNull();
    });
  });

  describe('playRandomSong', () => {
    it('should play a random song and update play stats', async () => {
      const mockUpdatedSong = { ...mockSong, playCount: 1 };
      mockSong.save.mockResolvedValue(mockUpdatedSong);

      mockSongModel.countDocuments.mockResolvedValue(10);
      mockSongModel.findOne.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockSong),
        }),
      });

      const result = await service.playRandomSong();

      expect(mockSongModel.countDocuments).toHaveBeenCalled();
      expect(mockSongModel.findOne).toHaveBeenCalled();
      expect(mockSong.lastPlayedAt).toBeInstanceOf(Date);
      expect(mockSong.playCount).toBe(1);
      expect(mockSong.save).toHaveBeenCalled();
      expect(result).toEqual(mockUpdatedSong);
    });

    it('should throw error when no song is found', async () => {
      mockSongModel.countDocuments.mockResolvedValue(0);
      mockSongModel.findOne.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(service.playRandomSong()).rejects.toThrow(
        'Could not find a random song to play.',
      );
    });

    it('should handle database errors', async () => {
      mockSongModel.countDocuments.mockRejectedValue(new Error('Database error'));

      await expect(service.playRandomSong()).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('should return all songs sorted by play count', async () => {
      const mockSongs = [
        { ...mockSong, playCount: 5 },
        { ...mockSong, playCount: 3 },
      ];

      mockSongModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockSongs),
        }),
      });

      const result = await service.findAll();

      expect(mockSongModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockSongs);
    });

    it('should return empty array when no songs exist', async () => {
      mockSongModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([]),
        }),
      });

      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockSongModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(new Error('Database error')),
        }),
      });

      await expect(service.findAll()).rejects.toThrow('Database error');
    });
  });
});