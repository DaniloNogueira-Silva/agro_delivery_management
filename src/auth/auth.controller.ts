import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth') // Agrupa os endpoints de autenticação
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido, retorna um token JWT.',
  })
  @ApiResponse({
    status: 400,
    description: 'Credenciais inválidas.',
  })
  async login(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }
}
