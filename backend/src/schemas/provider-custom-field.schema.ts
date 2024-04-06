import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'provider_custom_fields',
  timestamps: true,
})
export class ProviderCustomField extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Provider', index: true }) // Reference to the Provider entity
  providerId: string;
}

export const CustomFieldSchema =
  SchemaFactory.createForClass(ProviderCustomField);
