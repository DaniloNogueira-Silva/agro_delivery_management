import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  async create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return await this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  async findAll() {
    return await this.maintenanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.maintenanceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    return await this.maintenanceService.update(id, updateMaintenanceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.maintenanceService.remove(id);
  }
}
