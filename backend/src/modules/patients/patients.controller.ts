import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from '../../schemas/patient.schema';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() createPatientDto: any) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  async findAll(@Query('providerId') providerId?: string): Promise<Patient[]> {
    if (providerId) {
      return this.patientsService.findByProviderId(providerId);
    } else {
      throw Error('Need provider Id');
    }
  }
}
