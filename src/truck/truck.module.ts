import { Truck, TruckSchema } from './entities/truck.entity';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Truck.name, schema: TruckSchema }]),
  ],
  controllers: [TruckController],
  providers: [TruckService],
})
export class TruckModule {}
