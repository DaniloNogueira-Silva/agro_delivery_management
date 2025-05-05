import { ApiProperty } from '@nestjs/swagger';

export class CreateTruckDto {
  @ApiProperty({
    description: 'Placa do caminhão',
    example: 'ABC-1234',
  })
  licensePlate: string;

  @ApiProperty({
    description: 'Tipo de caminhão (ex: "Refrigerado", "Carroceria")',
    example: 'Refrigerado',
  })
  type: string;

  @ApiProperty({
    description: 'Capacidade do caminhão em toneladas',
    example: 20,
  })
  capacity: number;

  @ApiProperty({
    description: 'Último status do caminhão (ex: "Em operação", "Em manutenção")',
    example: 'Em operação',
  })
  lastStatus: string;

  @ApiProperty({
    description: 'Data da próxima revisão do caminhão',
    example: '2025-06-15T00:00:00Z',
  })
  nextReview: Date;

  @ApiProperty({
    description: 'Custo estimado de manutenção do caminhão',
    example: 5000,
  })
  maintenanceCost: number;
}
