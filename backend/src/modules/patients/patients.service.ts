import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from '../../schemas/patient.schema';
import { UpdatePatientDto } from './dto/update-patient.dto';

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
    console.log(id);
    const deletedPatient = await this.patientModel
      .deleteOne({ _id: id })
      .exec();
    console.log(deletedPatient);
    if (!deletedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}
