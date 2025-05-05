import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty({
    description: 'Nome do motorista',
    example: 'João da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Email do motorista',
    example: 'joao.silva@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Número de telefone do motorista',
    example: '11987654321',
  })
  phone: string;

  @ApiProperty({
    description: 'Número da carteira de habilitação do motorista',
    example: '1234567890',
  })
  licenseNumber: string;

  @ApiProperty({
    description: 'Data de contratação do motorista',
    example: '2021-06-01T00:00:00Z',
  })
  hireDate: Date;

  @ApiProperty({
    description: 'Status do motorista (ex: ativo, inativo)',
    example: 'Ativo',
  })
  status: string;

  @ApiProperty({
    description: 'ID do caminhão atribuído ao motorista',
    example: '60c72b2f9eb1d5a6f5d8a8d7',
  })
  assignedTruck: string;

  @ApiProperty({
    description: 'Número total de entregas realizadas pelo motorista',
    example: 120,
  })
  totalDeliveries: number;

  @ApiProperty({
    description: 'Data de validade da carteira de habilitação do motorista',
    example: '2025-12-31T00:00:00Z',
  })
  licenseExpirationDate: Date;
}
