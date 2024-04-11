import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from '../schemas/provider.schema';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
