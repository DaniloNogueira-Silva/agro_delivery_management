import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '../auth/auth.guard';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

describe('MaintenanceController', () => {
  let controller: MaintenanceController;
  let maintenanceService: MaintenanceService;
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const mockMaintenanceService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceController],
      providers: [
        { provide: MaintenanceService, useValue: mockMaintenanceService },
      ],
    })
      .overrideGuard(AuthGuard) // Ignorar o AuthGuard nos testes
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<MaintenanceController>(MaintenanceController);
    maintenanceService = module.get<MaintenanceService>(MaintenanceService);
    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a maintenance', async () => {
      const createMaintenanceDto: CreateMaintenanceDto = {
        truck: '123',
        maintenanceType: 'Preventiva',
        description: 'Descrição da manutenção',
        maintenanceDate: new Date(),
        nextScheduledDate: new Date(),
        cost: 100,
        status: 'Pendente',
        comments: 'Comentários da manutenção',
      };
      const expectedResult = { _id: '1', ...createMaintenanceDto };

      jest
        .spyOn(maintenanceService, 'create')
        .mockResolvedValue(expectedResult as any);

      const result = await controller.create(createMaintenanceDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all maintenances', async () => {
      const maintenances = [{ name: 'Maintenance1' }, { name: 'Maintenance2' }];
      jest
        .spyOn(maintenanceService, 'findAll')
        .mockResolvedValue(maintenances as any);

      const result = await controller.findAll();
      expect(result).toEqual(maintenances);
    });
  });

  describe('findOne', () => {
    it('should return a maintenance by id', async () => {
      const maintenance = { _id: '1', name: 'Maintenance' };
      jest
        .spyOn(maintenanceService, 'findOne')
        .mockResolvedValue(maintenance as any);

      const result = await controller.findOne('1');
      expect(result).toEqual(maintenance);
    });
  });

  describe('update', () => {
    it('should update a maintenance', async () => {
      const updateMaintenanceDto: UpdateMaintenanceDto = {
        status: 'Em andamento',
      };
      const updatedMaintenance = {
        truck: '123',
        maintenanceType: 'Preventiva',
        description: 'Descrição da manutenção',
        maintenanceDate: new Date(),
        nextScheduledDate: new Date(),
        cost: 100,
        status: 'Em andamento',
        comments: 'Comentários da manutenção',
      };

      jest
        .spyOn(maintenanceService, 'update')
        .mockResolvedValue(updatedMaintenance as any);

      const result = await controller.update('1', updateMaintenanceDto);
      expect(result).toEqual(updatedMaintenance);
    });
  });

  describe('remove', () => {
    it('should remove a maintenance', async () => {
      const expectedResponse = {
        message: 'Maintenance with ID 1 successfully deleted',
      };

      jest
        .spyOn(maintenanceService, 'remove')
        .mockResolvedValue(expectedResponse);

      const result = await controller.remove('1');
      expect(result).toEqual(expectedResponse);
    });
  });
});
