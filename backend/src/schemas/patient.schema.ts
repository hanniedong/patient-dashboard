import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'patients', timestamps: true })
export class Patient extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  middleName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({
    required: true,
    enum: ['Inquiry', 'Onboarding', 'Active', 'Churned'],
  })
  status: string;

  @Prop(String)
  primaryAddress: string;

  @Prop([String])
  additionalAddresses: string[];

  @Prop({ type: Types.ObjectId, ref: 'Provider' }) // Reference to the Provider entity
  providerId: string; // You can also use Types.ObjectId type here

  @Prop({ type: Map, of: String })
  customFields: Record<string, string>;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
