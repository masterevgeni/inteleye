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
    const kpiPipeline: PipelineStage[] = [
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

    const genrePipeline: PipelineStage[] = [
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $project: { name: '$_id', value: '$count', _id: 0 } },
      { $sort: { value: -1 } },
    ];

    const artistPipeline: PipelineStage[] = [
      { $group: { _id: '$artist', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { name: '$_id', songs: '$count', _id: 0 } },
    ];
    
    const decadePipeline: PipelineStage[] = [ 
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

    const getMostRecentPlayed = this.songModel.findOne().sort({ lastPlayedAt: -1 }).exec();

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
    const random = Math.floor(Math.random() * count);
    const randomSong = await this.songModel.findOne().skip(random).exec();

    if (randomSong) {
      randomSong.lastPlayedAt = new Date();
      randomSong.playCount += 1;
      return randomSong.save();
    }
    throw new Error('Could not find a random song to play.');
  }

   async findAll(): Promise<Song[]> {
    return this.songModel.find().sort({ playCount: -1 }).exec();
  }
}