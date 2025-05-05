import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'admin',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  password: string;

  @ApiProperty({
    description: 'Papel do usuário (ADMIN ou DRIVER)',
    example: 'ADMIN',
    required: false,
  })
  role?: string;
}
