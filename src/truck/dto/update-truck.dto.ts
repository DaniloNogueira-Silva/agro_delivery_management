import { ApiProperty } from '@nestjs/swagger';

export class UpdateTruckDto {
  @ApiProperty({
    description: 'Placa do caminhão',
    example: 'ABC-1234',
    required: false,
  })
  licensePlate?: string;

  @ApiProperty({
    description: 'Tipo de caminhão',
    example: 'Refrigerado',
    required: false,
  })
  type?: string;

  @ApiProperty({
    description: 'Capacidade do caminhão',
    example: 20,
    required: false,
  })
  capacity?: number;

  @ApiProperty({
    description: 'Último status do caminhão',
    example: 'Em operação',
    required: false,
  })
  lastStatus?: string;

  @ApiProperty({
    description: 'Data da próxima revisão',
    example: '2025-06-15T00:00:00Z',
    required: false,
  })
  nextReview?: Date;

  @ApiProperty({
    description: 'Custo estimado de manutenção',
    example: 5000,
    required: false,
  })
  maintenanceCost?: number;
}
