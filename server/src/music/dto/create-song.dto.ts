import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  artist: string;
  
  @IsString()
  @IsNotEmpty()
  album: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  releaseYear: number;

  @IsOptional()
  @IsDate()
  lastPlayedAt?: Date;
  
  @IsNumber()
  playCount: number = 0;
}