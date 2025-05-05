import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Driver extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  licenseNumber: string;  // CNH do motorista

  @Prop({ required: true })
  hireDate: Date;  // Data de contratação

  @Prop({ required: true, enum: ['Ativo', 'Inativo', 'Afastado'], default: 'Ativo' })
  status: string;  // Status do motorista

  @Prop({ type: String, ref: 'Truck', required: false })
  assignedTruck: string;  // ID do caminhão atribuído

  @Prop({ default: 0 })
  totalDeliveries: number;  // Total de entregas realizadas

  @Prop()
  licenseExpirationDate: Date;  // Data de expiração da CNH

}

export const DriverSchema = SchemaFactory.createForClass(Driver);
