import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProvidersCustomFieldsService } from './providers-custom-fields.service';
import { CreateProviderCustomFieldDto } from './dto/create-provider-custom-field.dto';
import { ProviderCustomField } from 'src/schemas/provider-custom-field.schema';

@Controller('providers-custom-fields')
export class ProvidersCustomFieldsController {
  constructor(
    private readonly providersCustomFieldsService: ProvidersCustomFieldsService,
  ) {}

  @Post()
  create(@Body() createProviderCustomFieldDto: CreateProviderCustomFieldDto) {
    return this.providersCustomFieldsService.create(
      createProviderCustomFieldDto,
    );
  }

  @Get()
  async findAll(
    @Query('providerId') providerId: string,
  ): Promise<ProviderCustomField[]> {
    return this.providersCustomFieldsService.findAll(providerId);
  }
}
