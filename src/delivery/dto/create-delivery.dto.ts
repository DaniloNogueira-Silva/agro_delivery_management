export class CreateDeliveryDto {
    truck: string;
    driver: string;
    origin: string;
    destination: string;
    status: string;
    deliveryDate: Date;
    deliveryDetails: string;
    distance: number;
    fuelCost: number;
}
