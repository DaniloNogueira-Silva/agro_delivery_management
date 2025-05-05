import { ApiProperty } from '@nestjs/swagger';

export class UpdateMaintenanceDto {
  @ApiProperty({
    description: 'ID do caminhão relacionado à manutenção',
    example: '60c72b2f9eb1d5a6f5d8a8d7',
    required: false,
  })
  truck?: string;

  @ApiProperty({
    description: 'Tipo da manutenção',
    example: 'Preventiva',
    enum: ['Preventiva', 'Corretiva', 'Revisão'],
    required: false,
  })
  maintenanceType?: 'Preventiva' | 'Corretiva' | 'Revisão';

  @ApiProperty({
    description: 'Descrição detalhada da manutenção realizada',
    example: 'Troca de óleo do motor',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Data em que a manutenção foi realizada',
    example: '2025-05-01T00:00:00Z',
    required: false,
  })
  maintenanceDate?: Date;

  @ApiProperty({
    description: 'Data da próxima manutenção agendada',
    example: '2025-06-01T00:00:00Z',
    required: false,
  })
  nextScheduledDate?: Date;

  @ApiProperty({
    description: 'Custo da manutenção',
    example: 500,
    required: false,
  })
  cost?: number;

  @ApiProperty({
    description: 'Status da manutenção',
    example: 'Completa',
    enum: ['Completa', 'Pendente', 'Em andamento'],
    required: false,
  })
  status?: 'Completa' | 'Pendente' | 'Em andamento';

  @ApiProperty({
    description: 'Comentários adicionais sobre a manutenção',
    example: 'Verificar vazamento no sistema de ar condicionado',
    required: false,
  })
  comments?: string;
}
