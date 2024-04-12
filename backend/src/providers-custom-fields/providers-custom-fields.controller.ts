import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProvidersCustomFieldsService } from './providers-custom-fields.service';
import { CreateProviderCustomFieldDto } from './dto/create-provider-custom-field.dto';
import { ProviderCustomField } from 'src/schemas/provider-custom-field.schema';

@Controller('providers-custom-fields')
export class ProvidersCustomFieldsController {
  constructor(
    private readonly providersCustomFieldsService: ProvidersCustomFieldsService,
  ) {}

  @Post()
  async create(
    @Body() createProviderCustomFieldDto: CreateProviderCustomFieldDto,
  ) {
    try {
      return await this.providersCustomFieldsService.create(
        createProviderCustomFieldDto,
      );
    } catch (e) {
      throw new InternalServerErrorException('Internal server error', e);
    }
  }

  @Get()
  async findAll(
    @Query('providerId') providerId: string,
  ): Promise<ProviderCustomField[]> {
    try {
      return await this.providersCustomFieldsService.findAll(providerId);
    } catch (e) {
      throw new InternalServerErrorException('Internal server error', e);
    }
  }
}
