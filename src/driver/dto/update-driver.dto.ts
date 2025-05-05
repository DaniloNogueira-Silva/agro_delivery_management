import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriverDto {
  @ApiProperty({
    description: 'Nome do motorista',
    example: 'João da Silva',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Email do motorista',
    example: 'joao.silva@email.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Número de telefone do motorista',
    example: '11987654321',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'Número da carteira de habilitação do motorista',
    example: '1234567890',
    required: false,
  })
  licenseNumber?: string;

  @ApiProperty({
    description: 'Data de contratação do motorista',
    example: '2021-06-01T00:00:00Z',
    required: false,
  })
  hireDate?: Date;

  @ApiProperty({
    description: 'Status do motorista (ex: ativo, inativo)',
    example: 'Ativo',
    required: false,
  })
  status?: string;

  @ApiProperty({
    description: 'ID do caminhão atribuído ao motorista',
    example: '60c72b2f9eb1d5a6f5d8a8d7',
    required: false,
  })
  assignedTruck?: string;

  @ApiProperty({
    description: 'Número total de entregas realizadas pelo motorista',
    example: 120,
    required: false,
  })
  totalDeliveries?: number;

  @ApiProperty({
    description: 'Data de validade da carteira de habilitação do motorista',
    example: '2025-12-31T00:00:00Z',
    required: false,
  })
  licenseExpirationDate?: Date;
}
