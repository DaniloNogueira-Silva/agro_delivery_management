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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('user') // Tag que agrupa os endpoints de usuário
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na criação do usuário' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os usuários',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obter usuário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro na atualização do usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
