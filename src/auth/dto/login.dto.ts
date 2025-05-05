import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'password123',
  })
  password: string;
}
