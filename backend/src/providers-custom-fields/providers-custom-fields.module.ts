import { Module } from '@nestjs/common';
import { ProvidersCustomFieldsController } from './providers-custom-fields.controller';
import { ProvidersCustomFieldsService } from './providers-custom-fields.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProviderCustomField,
  ProviderCustomFieldSchema,
} from 'src/schemas/provider-custom-field.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProviderCustomField.name, schema: ProviderCustomFieldSchema },
    ]),
  ],
  controllers: [ProvidersCustomFieldsController],
  providers: [ProvidersCustomFieldsService],
})
export class ProvidersCustomFieldsModule {}
