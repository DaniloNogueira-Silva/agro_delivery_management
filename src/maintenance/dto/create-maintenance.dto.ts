export class CreateMaintenanceDto {
    truck: string;
    maintenanceType: 'Preventiva' | 'Corretiva' | 'Revisão';
    description: string;
    maintenanceDate: Date;
    nextScheduledDate?: Date;
    cost: number;
    status: 'Completa' | 'Pendente' | 'Em andamento';
    comments?: string;
  }
  