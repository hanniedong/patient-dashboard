import { Controller, Get, Post, Body } from '@nestjs/common';
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
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }
}
