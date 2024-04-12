import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { ProvidersCustomFieldsModule } from './providers-custom-fields/providers-custom-fields.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    PatientsModule,
    ProvidersCustomFieldsModule,
  ],
})
export class AppModule {}
