import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Song extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  album: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  releaseYear: number;

  @Prop()
  lastPlayedAt?: Date;

  @Prop({ default: 0 })
  playCount: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);