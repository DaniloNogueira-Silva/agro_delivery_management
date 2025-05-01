import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Truck extends Document {
  @Prop({ required: true })
  licensePlate: string;

  @Prop({ required: true })
  type: string; // Ex: "Refrigerado", "Normal"

  @Prop({ required: true })
  capacity: number; // Em toneladas ou litros

  @Prop({ required: true })
  lastStatus: string; // Ex: "Disponível", "Em Manutenção"

  @Prop({ required: false })
  nextReview: Date;

  @Prop({ required: false })
  maintenanceCost: number; // Custo da última manutenção
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
