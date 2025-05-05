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
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    return await this.driverService.create(createDriverDto);
  }

  @Get()
  async findAll() {
    return await this.driverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.driverService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return await this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.driverService.remove(id);
  }
}
