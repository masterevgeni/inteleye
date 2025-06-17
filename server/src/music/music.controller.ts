import { Controller, Get, Post } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('stats')
  async getDashboardStats() {
    return this.musicService.getDashboardStats();
  }

  @Post('play-random')
  async playRandomSong() {
    const song = await this.musicService.playRandomSong();
    if (!song) {
      return { message: 'No song is currently available to play.' };
    }
    // return { message: `Now playing ${song.title} by ${song.artist}`};
    return song;
  }
}