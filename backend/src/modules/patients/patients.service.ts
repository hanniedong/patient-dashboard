import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from '../../schemas/patient.schema';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: any): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    console.log(createdPatient);
    return createdPatient.save();
  }

  async findByProviderId(providerId: string): Promise<Patient[]> {
    return this.patientModel.find({ providerId }).exec();
  }
}
