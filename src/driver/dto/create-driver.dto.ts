export class CreateDriverDto {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  hireDate: Date;
  status: string;
  assignedTruck: string;
  totalDeliveries: number;
  licenseExpirationDate: Date;
}
