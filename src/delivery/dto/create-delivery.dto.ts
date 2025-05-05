import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({
    description: 'ID do caminhão relacionado à entrega',
    example: '60c72b2f9eb1d5a6f5d8a8d7',
  })
  truck: string;

  @ApiProperty({
    description: 'ID do motorista responsável pela entrega',
    example: '60c72b2f9eb1d5a6f5d8a8d8',
  })
  driver: string;

  @ApiProperty({
    description: 'Endereço de origem da entrega',
    example: 'Rua ABC, 123, São Paulo',
  })
  origin: string;

  @ApiProperty({
    description: 'Endereço de destino da entrega',
    example: 'Rua XYZ, 456, Campinas',
  })
  destination: string;

  @ApiProperty({
    description: 'Status atual da entrega',
    example: 'Em andamento',
    enum: ['Pendente', 'Em andamento', 'Concluída'],
  })
  status: string;

  @ApiProperty({
    description: 'Data prevista para a entrega',
    example: '2025-05-01T00:00:00Z',
  })
  deliveryDate: Date;

  @ApiProperty({
    description: 'Detalhes adicionais sobre a entrega',
    example: 'Entrega de produtos perecíveis, necessita de cuidados especiais.',
  })
  deliveryDetails: string;

  @ApiProperty({
    description: 'Distância da entrega em quilômetros',
    example: 120,
  })
  distance: number;

  @ApiProperty({
    description: 'Custo estimado de combustível para a entrega',
    example: 150,
  })
  fuelCost: number;
}
