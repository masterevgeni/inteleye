import { Controller, Get, Post } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) { }

  @Get('stats')
  async dashboardStats() {
    return this.musicService.getDashboardStats();
  }

  @Get('songs')
  async songs() {
    return this.musicService.findAll();
  }

  @Post('play-random')
  async playRandomSong() {
    const song = await this.musicService.playRandomSong();
    if (!song) {
      return { message: 'No song is currently available to play.' };
    }
    return song;
  }
}