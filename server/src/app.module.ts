import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI || '', {
      authSource: process.env.AUTH_SOURCE, 
    }),
    MusicModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

