import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { ProvidersModule } from './providers/providers.module';
import { ProvidersCustomFieldsModule } from './providers-custom-fields/providers-custom-fields.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    PatientsModule,
    ProvidersModule,
    ProvidersCustomFieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
