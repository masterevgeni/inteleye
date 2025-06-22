import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

describe('MusicController', () => {
  let controller: MusicController;
  let service: MusicService;

  const mockMusicService = {
    getDashboardStats: jest.fn(),
    findAll: jest.fn(),
    playRandomSong: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController],
      providers: [
        {
          provide: MusicService,
          useValue: mockMusicService,
        },
      ],
    }).compile();

    controller = module.get<MusicController>(MusicController);
    service = module.get<MusicService>(MusicService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('dashboardStats', () => {
    it('should return dashboard statistics', async () => {
      const mockStats = {
        kpis: { totalSongs: 10, avgDuration: 240, totalUniqueArtists: 5 },
        genreDistribution: [{ name: 'Rock', value: 5 }],
        topArtists: [{ name: 'Artist 1', songs: 3 }],
        songsByDecade: [{ name: '2020s', count: 5 }],
        nowPlaying: { title: 'Test Song', artist: 'Test Artist' },
      };

      mockMusicService.getDashboardStats.mockResolvedValue(mockStats);

      const result = await controller.dashboardStats();

      expect(service.getDashboardStats).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStats);
    });

    it('should handle service errors', async () => {
      mockMusicService.getDashboardStats.mockRejectedValue(new Error('Database error'));

      await expect(controller.dashboardStats()).rejects.toThrow('Database error');
      expect(service.getDashboardStats).toHaveBeenCalledTimes(1);
    });
  });

  describe('songs', () => {
    it('should return all songs', async () => {
      const mockSongs = [
        { title: 'Song 1', artist: 'Artist 1', playCount: 5 },
        { title: 'Song 2', artist: 'Artist 2', playCount: 3 },
      ];

      mockMusicService.findAll.mockResolvedValue(mockSongs);

      const result = await controller.songs();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSongs);
    });

    it('should return empty array when no songs exist', async () => {
      mockMusicService.findAll.mockResolvedValue([]);

      const result = await controller.songs();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe('playRandomSong', () => {
    it('should return a random song when available', async () => {
      const mockSong = {
        title: 'Random Song',
        artist: 'Random Artist',
        playCount: 1,
        lastPlayedAt: new Date(),
      };

      mockMusicService.playRandomSong.mockResolvedValue(mockSong);

      const result = await controller.playRandomSong();

      expect(service.playRandomSong).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSong);
    });

    it('should return message when no song is available', async () => {
      mockMusicService.playRandomSong.mockResolvedValue(null);

      const result = await controller.playRandomSong();

      expect(service.playRandomSong).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        message: 'No song is currently available to play.',
      });
    });

    it('should handle service errors', async () => {
      mockMusicService.playRandomSong.mockRejectedValue(new Error('Playback error'));

      await expect(controller.playRandomSong()).rejects.toThrow('Playback error');
      expect(service.playRandomSong).toHaveBeenCalledTimes(1);
    });
  });
});