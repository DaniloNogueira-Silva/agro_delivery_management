import { Driver, DriverSchema } from './entities/driver.entity';

import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
