import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from '../schemas/patient.schema';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { getBirthYearRange } from './patients.helper';

interface SearchQuery {
  firstName?: string;
  lastName?: string;
  providerId: string;
  status?: string;
  dateOfBirth?: { $gte: Date; $lte: Date };
}

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: any): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    return createdPatient.save();
  }

  async findByProviderId(providerId: string): Promise<Patient[]> {
    return this.patientModel.find({ providerId }).exec();
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const updatedPatient = await this.patientModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();
    if (!updatedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return updatedPatient;
  }

  async remove(id: string) {
    const deletedPatient = await this.patientModel
      .deleteOne({ _id: id })
      .exec();
    if (!deletedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async search(
    providerId: string,
    search: {
      firstName: string;
      lastName: string;
      status: string;
      minAge: number;
      maxAge: number;
    },
  ): Promise<Patient[]> {
    const query: SearchQuery = { providerId };
    if (search.firstName) {
      query.firstName = search.firstName;
    }
    if (search.lastName) {
      query.lastName = search.lastName;
    }
    if (search.status) {
      query.status = search.status;
    }
    if (search.minAge || search.maxAge) {
      const [minDate, maxDate] = getBirthYearRange(
        search.minAge,
        search.maxAge,
      );
      query.dateOfBirth = { $gte: minDate, $lte: maxDate };
      console.log(query.dateOfBirth);
    }
    if (search.status) {
      query.status = search.status;
    }
    console.log(query);
    const patients = await this.patientModel.find(query).exec();
    return patients;
  }
}
