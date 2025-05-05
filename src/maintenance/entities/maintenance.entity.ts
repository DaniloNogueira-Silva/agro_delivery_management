import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Maintenance extends Document {
  @Prop({ type: String, ref: 'Truck', required: true })
  truck: string; // Referência ao caminhão relacionado à manutenção

  @Prop({
    required: true,
    enum: ['Preventiva', 'Corretiva', 'Revisão'],
    default: 'Revisão',
  })
  maintenanceType: string; // Tipo de manutenção

  @Prop({ required: true })
  description: string; // Descrição do que foi feito

  @Prop({ required: true })
  maintenanceDate: Date; // Data da manutenção

  @Prop()
  nextScheduledDate: Date; // Próxima data agendada para manutenção

  @Prop({ required: true })
  cost: number; // Custo da manutenção

  @Prop({ enum: ['Completa', 'Pendente', 'Em andamento'], default: 'Pendente' })
  status: string; // Status da manutenção

  @Prop()
  comments: string; // Comentários adicionais
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
