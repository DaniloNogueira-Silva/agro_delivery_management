import { Maintenance, MaintenanceSchema } from './entities/maintenance.entity';

import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Maintenance.name, schema: MaintenanceSchema }]),
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
})
export class MaintenanceModule {}
