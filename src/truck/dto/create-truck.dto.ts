export class CreateTruckDto {
  licensePlate: string;
  type: string;
  capacity: number;
  lastStatus: string;
  nextReview: Date;
  maintenanceCost: number;
}
