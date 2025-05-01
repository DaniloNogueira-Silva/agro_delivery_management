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
import { TruckService } from './truck.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('truck')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Post()
  async create(@Body() createTruckDto: CreateTruckDto) {
    return await this.truckService.create(createTruckDto);
  }

  @Get()
  async findAll() {
    return await this.truckService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.truckService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return await this.truckService.update(id, updateTruckDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.truckService.remove(id);
  }
}
