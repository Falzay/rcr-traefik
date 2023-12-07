// team.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Team extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: true })
  point: number;

  @Prop({ required: true })
  ffr_id: number;

  @Prop({ required: true })
  saison: string;

  @Prop({ required: true })
  phase: number;

  @Prop()
  logoPath: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
