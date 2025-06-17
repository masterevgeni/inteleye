import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose'; 
import { Song } from './schemas/song.schema';
import { sampleSongs } from './data/sample-data';

export interface IKpiResult {
  totalSongs: number;
  avgDuration: number;
  totalUniqueArtists: number;
}
export interface IChartDataPoint {
    name: string;
    [key: string]: any;
}

@Injectable()
// export class MusicService  {
export class MusicService implements OnModuleInit {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const count = await this.songModel.countDocuments().exec();
    if (count === 0) {
      console.log('Database is empty. Seeding with sample data...');
      await this.songModel.insertMany(sampleSongs);
      console.log('Seeding complete.');
    }
  }

  async getDashboardStats() {
    // 1. KPI Calculations
    const kpiPipeline: PipelineStage[] = [ // <-- Explicitly type the array
      {
        $group: {
          _id: null,
          totalSongs: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          uniqueArtists: { $addToSet: '$artist' },
        },
      },
      {
        $project: {
          _id: 0,
          totalSongs: 1,
          avgDuration: { $divide: ['$totalDuration', '$totalSongs'] },
          totalUniqueArtists: { $size: '$uniqueArtists' },
        },
      },
    ];

    // 2. Genre Distribution
    const genrePipeline: PipelineStage[] = [ // <-- Explicitly type the array
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $project: { name: '$_id', value: '$count', _id: 0 } },
      { $sort: { value: -1 } },
    ];

    // 3. Top 5 Artists
    const artistPipeline: PipelineStage[] = [ // <-- Explicitly type the array
      { $group: { _id: '$artist', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { name: '$_id', songs: '$count', _id: 0 } },
    ];
    
    // 4. Songs by Decade
    const decadePipeline: PipelineStage[] = [ // <-- Explicitly type the array
        {
            $project: {
                decade: {
                    $concat: [
                        { $toString: { $subtract: [ '$releaseYear', { $mod: ['$releaseYear', 10] } ] } },
                        "s"
                    ]
                }
            }
        },
        { $group: { _id: '$decade', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { name: '$_id', count: 1, _id: 0 } },
    ];

    // 5. Recently Played
    const getMostRecentPlayed = this.songModel.findOne().sort({ lastPlayedAt: -1 }).exec();

    // Now call aggregate with the correctly typed pipelines
    const [kpiResult, genreDistribution, topArtists, byDecade, mostRecent] = await Promise.all([
      this.songModel.aggregate<IKpiResult>(kpiPipeline).exec(),
      this.songModel.aggregate<IChartDataPoint>(genrePipeline).exec(),
      this.songModel.aggregate<IChartDataPoint>(artistPipeline).exec(),
      this.songModel.aggregate<IChartDataPoint>(decadePipeline).exec(),
      getMostRecentPlayed
    ]);
    
    return {
      kpis: kpiResult[0] || { totalSongs: 0, avgDuration: 0, totalUniqueArtists: 0 },
      genreDistribution,
      topArtists,
      songsByDecade: byDecade,
      nowPlaying: mostRecent
    };
  }

  async playRandomSong(): Promise<Song> {
    const count = await this.songModel.countDocuments();
    console.log('counst: ', count);
    
    const random = Math.floor(Math.random() * count);
    console.log('random: ', random);

    const randomSong = await this.songModel.findOne().skip(random).exec();
    console.log('randomSong: ',randomSong);

    if (randomSong) {
      randomSong.lastPlayedAt = new Date();
      return randomSong.save();
    }
    // Handle the case where the song is not found, although unlikely in this context
    throw new Error('Could not find a random song to play.');
  }
}