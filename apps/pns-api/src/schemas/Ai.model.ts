import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AiDocument = Ai & Document;

@Schema({ timestamps: true })
export class Ai {
  @Prop({ type: String, required: true })
  question: string;   // user yozgan text

  @Prop({ type: String, required: true })
  answer: string;     // AI javobi
}

export const AiSchema = SchemaFactory.createForClass(Ai);