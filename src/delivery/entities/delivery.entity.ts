import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Delivery extends Document {
  @Prop({ type: String, ref: 'Truck', required: true })
  truck: string; // Referência ao caminhão

  @Prop({ type: String, ref: 'Driver', required: true })
  driver: string; // Referência ao motorista

  @Prop({ required: true })
  origin: string; // Local de origem da entrega

  @Prop({ required: true })
  destination: string; // Local de destino da entrega

  @Prop({ default: 'Pendente', enum: ['Pendente', 'Em andamento', 'Entregue'] })
  status: string; // Status da entrega (ex: Pendência, Em andamento, Entregue)

  @Prop()
  deliveryDate: Date; // Data da entrega (para quando for finalizada)

  @Prop()
  deliveryDetails: string; // Detalhes adicionais da entrega (ex: Observações sobre a carga)

  @Prop()
  distance: number; // Distância percorrida na entrega (em km)

  @Prop()
  fuelCost: number; // Custo estimado do combustível
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
