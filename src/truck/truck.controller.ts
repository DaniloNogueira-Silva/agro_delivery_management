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
import { TruckService } from './truck.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('truck') // Tag que agrupa os endpoints de caminhões
@Controller('truck')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo caminhão' })
  @ApiBody({ type: CreateTruckDto })
  @ApiResponse({
    status: 201,
    description: 'Caminhão criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar o caminhão' })
  async create(@Body() createTruckDto: CreateTruckDto) {
    return await this.truckService.create(createTruckDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os caminhões' })
  @ApiResponse({
    status: 200,
    description: 'Lista de caminhões retornada com sucesso',
  })
  async findAll() {
    return await this.truckService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um caminhão por ID' })
  @ApiResponse({
    status: 200,
    description: 'Caminhão encontrado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Caminhão não encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.truckService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um caminhão' })
  @ApiBody({ type: UpdateTruckDto })
  @ApiResponse({
    status: 200,
    description: 'Caminhão atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na atualização do caminhão' })
  @ApiResponse({ status: 404, description: 'Caminhão não encontrado' })
  async update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return await this.truckService.update(id, updateTruckDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um caminhão' })
  @ApiResponse({
    status: 200,
    description: 'Caminhão deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Caminhão não encontrado' })
  async remove(@Param('id') id: string) {
    return await this.truckService.remove(id);
  }
}
