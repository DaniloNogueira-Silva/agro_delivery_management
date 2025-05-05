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
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('maintenance') // Tag que agrupa os endpoints de manutenção
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova manutenção' })
  @ApiBody({ type: CreateMaintenanceDto })
  @ApiResponse({
    status: 201,
    description: 'Manutenção criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na criação da manutenção' })
  async create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return await this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as manutenções' })
  @ApiResponse({
    status: 200,
    description: 'Lista de manutenções retornada com sucesso',
  })
  async findAll() {
    return await this.maintenanceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma manutenção por ID' })
  @ApiResponse({
    status: 200,
    description: 'Manutenção encontrada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Manutenção não encontrada' })
  async findOne(@Param('id') id: string) {
    return await this.maintenanceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma manutenção' })
  @ApiBody({ type: UpdateMaintenanceDto })
  @ApiResponse({
    status: 200,
    description: 'Manutenção atualizada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na atualização da manutenção' })
  @ApiResponse({ status: 404, description: 'Manutenção não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    return await this.maintenanceService.update(id, updateMaintenanceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma manutenção' })
  @ApiResponse({
    status: 200,
    description: 'Manutenção deletada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Manutenção não encontrada' })
  async remove(@Param('id') id: string) {
    return await this.maintenanceService.remove(id);
  }
}
