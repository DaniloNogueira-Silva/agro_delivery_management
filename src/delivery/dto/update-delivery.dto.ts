import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeliveryDto {
  @ApiProperty({
    description: 'ID do caminhão relacionado à entrega',
    example: '60c72b2f9eb1d5a6f5d8a8d7',
    required: false,
  })
  truck?: string;

  @ApiProperty({
    description: 'ID do motorista responsável pela entrega',
    example: '60c72b2f9eb1d5a6f5d8a8d8',
    required: false,
  })
  driver?: string;

  @ApiProperty({
    description: 'Endereço de origem da entrega',
    example: 'Rua ABC, 123, São Paulo',
    required: false,
  })
  origin?: string;

  @ApiProperty({
    description: 'Endereço de destino da entrega',
    example: 'Rua XYZ, 456, Campinas',
    required: false,
  })
  destination?: string;

  @ApiProperty({
    description: 'Status atual da entrega',
    example: 'Em andamento',
    enum: ['Pendente', 'Em andamento', 'Concluída'],
    required: false,
  })
  status?: string;

  @ApiProperty({
    description: 'Data prevista para a entrega',
    example: '2025-05-01T00:00:00Z',
    required: false,
  })
  deliveryDate?: Date;

  @ApiProperty({
    description: 'Detalhes adicionais sobre a entrega',
    example: 'Entrega de produtos perecíveis, necessita de cuidados especiais.',
    required: false,
  })
  deliveryDetails?: string;

  @ApiProperty({
    description: 'Distância da entrega em quilômetros',
    example: 120,
    required: false,
  })
  distance?: number;

  @ApiProperty({
    description: 'Custo estimado de combustível para a entrega',
    example: 150,
    required: false,
  })
  fuelCost?: number;
}
