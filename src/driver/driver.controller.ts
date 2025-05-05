import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('driver') // Tag que agrupa os endpoints de motorista
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo motorista' })
  @ApiBody({ type: CreateDriverDto })
  @ApiResponse({
    status: 201,
    description: 'Motorista criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na criação do motorista' })
  async create(@Body() createDriverDto: CreateDriverDto) {
    return await this.driverService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os motoristas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de motoristas retornada com sucesso',
  })
  async findAll() {
    return await this.driverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um motorista por ID' })
  @ApiResponse({
    status: 200,
    description: 'Motorista encontrado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.driverService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um motorista' })
  @ApiBody({ type: UpdateDriverDto })
  @ApiResponse({
    status: 200,
    description: 'Motorista atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na atualização do motorista' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return await this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um motorista' })
  @ApiResponse({
    status: 200,
    description: 'Motorista deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async remove(@Param('id') id: string) {
    return await this.driverService.remove(id);
  }
}
