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
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('delivery') // Tag que agrupa os endpoints de entrega
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova entrega' })
  @ApiBody({ type: CreateDeliveryDto })
  @ApiResponse({
    status: 201,
    description: 'Entrega criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na criação da entrega' })
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return await this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as entregas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de entregas retornada com sucesso',
  })
  async findAll() {
    return await this.deliveryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma entrega por ID' })
  @ApiResponse({
    status: 200,
    description: 'Entrega encontrada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Entrega não encontrada' })
  async findOne(@Param('id') id: string) {
    return await this.deliveryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma entrega' })
  @ApiBody({ type: UpdateDeliveryDto })
  @ApiResponse({
    status: 200,
    description: 'Entrega atualizada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na atualização da entrega' })
  @ApiResponse({ status: 404, description: 'Entrega não encontrada' })
  async update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return await this.deliveryService.update(id, updateDeliveryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma entrega' })
  @ApiResponse({
    status: 200,
    description: 'Entrega deletada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Entrega não encontrada' })
  async remove(@Param('id') id: string) {
    return await this.deliveryService.remove(id);
  }
}
