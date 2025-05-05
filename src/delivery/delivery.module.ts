import { Delivery, DeliverySchema } from './entities/delivery.entity';

import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Delivery.name, schema: DeliverySchema }]),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
