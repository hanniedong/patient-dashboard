import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'providers', timestamps: true })
export class Provider extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
