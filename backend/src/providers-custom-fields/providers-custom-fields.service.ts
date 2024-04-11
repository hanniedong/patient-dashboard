import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProviderCustomFieldDto } from './dto/create-provider-custom-field.dto';
import { ProviderCustomField } from 'src/schemas/provider-custom-field.schema';

@Injectable()
export class ProvidersCustomFieldsService {
  constructor(
    @InjectModel(ProviderCustomField.name)
    private providerCustomFieldModel: Model<ProviderCustomField>,
  ) {}

  async create(
    createProviderCustomFieldDto: CreateProviderCustomFieldDto,
  ): Promise<ProviderCustomField> {
    console.log(createProviderCustomFieldDto);
    const createdProviderCustomField = new this.providerCustomFieldModel(
      createProviderCustomFieldDto,
    );
    return createdProviderCustomField.save();
  }

  async findAll(providerId: string): Promise<ProviderCustomField[]> {
    return this.providerCustomFieldModel.find({ providerId }).exec();
  }
}
