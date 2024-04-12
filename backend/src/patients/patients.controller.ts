import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Param,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from '../schemas/patient.schema';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() createPatientDto: any) {
    try {
      return await this.patientsService.create(createPatientDto);
    } catch (e) {
      throw new InternalServerErrorException('Internal server error', e);
    }
  }

  @Get()
  async findAll(
    @Query('providerId') providerId: string,
    @Query('search')
    search: {
      firstName: string;
      lastName: string;
      status: string;
      minAge: number;
      maxAge: number;
      city: string;
    },
  ): Promise<Patient[]> {
    try {
      if (providerId) {
        if (search) {
          return await this.patientsService.search(providerId, search);
        } else {
          return await this.patientsService.findByProviderId(providerId);
        }
      } else {
        throw new BadRequestException('Need Provider Id');
      }
    } catch (e) {
      throw new InternalServerErrorException('Internal server error', e);
    }
  }

  @Put(':id')
  async updatePatient(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    try {
      const updatedPatient = await this.patientsService.update(
        id,
        updatePatientDto,
      );
      return updatedPatient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Patient not found');
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid request body');
      } else {
        throw new InternalServerErrorException('Internal server error', error);
      }
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedPatient = await this.patientsService.remove(id);
      return { deletedPatient };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Internal server error', error);
    }
  }
}
