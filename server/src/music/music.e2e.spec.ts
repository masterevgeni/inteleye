import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as request from 'supertest';
import { MusicModule } from './music.module';
import { Song, SongSchema } from './schemas/song.schema';

describe('Music Module (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MusicModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });

  describe('/music/stats (GET)', () => {
    it('should return dashboard statistics', async () => {
      const response = await request(app.getHttpServer())
        .get('/music/stats')
        .expect(200);

      expect(response.body).toHaveProperty('kpis');
      expect(response.body).toHaveProperty('genreDistribution');
      expect(response.body).toHaveProperty('topArtists');
      expect(response.body).toHaveProperty('songsByDecade');
      expect(response.body).toHaveProperty('nowPlaying');

      expect(response.body.kpis).toHaveProperty('totalSongs');
      expect(response.body.kpis).toHaveProperty('avgDuration');
      expect(response.body.kpis).toHaveProperty('totalUniqueArtists');

      expect(Array.isArray(response.body.genreDistribution)).toBe(true);
      expect(Array.isArray(response.body.topArtists)).toBe(true);
      expect(Array.isArray(response.body.songsByDecade)).toBe(true);
    });
  });

  describe('/music/songs (GET)', () => {
    it('should return all songs', async () => {
      const response = await request(app.getHttpServer())
        .get('/music/songs')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        const song = response.body[0];
        expect(song).toHaveProperty('title');
        expect(song).toHaveProperty('artist');
        expect(song).toHaveProperty('genre');
        expect(song).toHaveProperty('duration');
        expect(song).toHaveProperty('releaseYear');
        expect(song).toHaveProperty('playCount');
      }
    });
  });

  describe('/music/play-random (POST)', () => {
    it('should play a random song and update play count', async () => {
      const response = await request(app.getHttpServer())
        .post('/music/play-random')
        .expect(201);

      if (response.body.message) {
        expect(response.body.message).toBe('No song is currently available to play.');
      } else {
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('artist');
        expect(response.body).toHaveProperty('playCount');
        expect(response.body).toHaveProperty('lastPlayedAt');
        expect(response.body.playCount).toBeGreaterThan(0);
      }
    });

    it('should increment play count on subsequent plays', async () => {
      // Get initial play count
      const initialSongsResponse = await request(app.getHttpServer())
        .get('/music/songs')
        .expect(200);

      const initialTotalPlayCount = initialSongsResponse.body.reduce(
        (sum: number, song: any) => sum + song.playCount,
        0,
      );

      let playsExecuted = 0;
      for (let i = 0; i < 3; i++) {
        const response = await request(app.getHttpServer())
          .post('/music/play-random')
          .expect(201);

        if (!response.body.message) {
          playsExecuted++;
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      if (playsExecuted > 0) {
        const finalSongsResponse = await request(app.getHttpServer())
          .get('/music/songs')
          .expect(200);

        const finalTotalPlayCount = finalSongsResponse.body.reduce(
          (sum: number, song: any) => sum + song.playCount,
          0,
        );

        expect(finalTotalPlayCount).toBeGreaterThan(initialTotalPlayCount);
        expect(finalTotalPlayCount - initialTotalPlayCount).toBe(playsExecuted);
      } else {
        console.log('No songs available for play testing');
      }
    });
  });

  describe('Data consistency', () => {
    it('should maintain data consistency across endpoints', async () => {
      // Get all songs
      const songsResponse = await request(app.getHttpServer())
        .get('/music/songs')
        .expect(200);

     
      const statsResponse = await request(app.getHttpServer())
        .get('/music/stats')
        .expect(200);

      const totalSongs = songsResponse.body.length;
      const statsTotal = statsResponse.body.kpis.totalSongs;

      expect(totalSongs).toBe(statsTotal);

      if (totalSongs > 0) {
        const uniqueArtists = new Set(
          songsResponse.body.map((song: any) => song.artist),
        ).size;
        expect(uniqueArtists).toBe(statsResponse.body.kpis.totalUniqueArtists);

        const totalDuration = songsResponse.body.reduce(
          (sum: number, song: any) => sum + song.duration,
          0,
        );
        const expectedAvgDuration = totalDuration / totalSongs;
        expect(Math.round(statsResponse.body.kpis.avgDuration)).toBe(
          Math.round(expectedAvgDuration),
        );
      }
    });
  });
});