import { Test, TestingModule } from '@nestjs/testing';

import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { Maintenance } from './entities/maintenance.entity';
import { MaintenanceService } from './maintenance.service';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import e from 'express';
import { getModelToken } from '@nestjs/mongoose';

describe('MaintenanceService', () => {
  let service: MaintenanceService;
  let maintenanceModel: any;

  beforeEach(async () => {
    const maintenanceModelMock = jest
      .fn()
      .mockImplementation((createMaintenanceDto) => ({
        ...createMaintenanceDto,
        save: jest.fn().mockResolvedValue({
          _id: '1',
          ...createMaintenanceDto,
        }),
      }));

    Object.assign(maintenanceModelMock, {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findOne: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaintenanceService,
        {
          provide: getModelToken(Maintenance.name),
          useValue: maintenanceModelMock,
        },
      ],
    }).compile();

    service = module.get<MaintenanceService>(MaintenanceService);
    maintenanceModel = module.get(getModelToken(Maintenance.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      const result = await service.create(createMaintenanceDto);

      expect(result).toHaveProperty('_id');
      expect(result.truck).toBe(createMaintenanceDto.truck);
      expect(result.maintenanceType).toBe(createMaintenanceDto.maintenanceType);
      expect(result.description).toBe(createMaintenanceDto.description);
      expect(result.maintenanceDate).toBe(createMaintenanceDto.maintenanceDate);
      expect(result.nextScheduledDate).toBe(
        createMaintenanceDto.nextScheduledDate,
      );
      expect(result.cost).toBe(createMaintenanceDto.cost);
      expect(result.status).toBe(createMaintenanceDto.status);
      expect(result.comments).toBe(createMaintenanceDto.comments);
    });
  });

  describe('findAll', () => {
    it('should return an array of maintenances', async () => {
      const maintenances = [
        {
          truck: '123',
          driver: '456',
          origin: 'São Paulo',
          destination: 'Rio de Janeiro',
          status: 'Pendente',
          maintenanceDate: new Date(),
          maintenanceDetails: 'Detalhes da entrega',
          distance: 100,
          fuelCost: 10,
        },
      ];
      maintenanceModel.find.mockResolvedValue(maintenances);

      const result = await service.findAll();
      expect(result).toEqual(maintenances);
    });
  });

  describe('findOne', () => {
    it('should return a maintenance by id', async () => {
      const maintenance = {
        truck: '123',
        maintenanceType: 'Preventiva',
        description: 'Descrição da manutenção',
        maintenanceDate: new Date(),
        nextScheduledDate: new Date(),
        cost: 100,
        status: 'Pendente',
        comments: 'Comentários da manutenção',
      };
      maintenanceModel.findById.mockResolvedValue(maintenance);

      const result = await service.findOne('1');
      expect(result).toEqual(maintenance);
    });
  });

  describe('update', () => {
    it('should update and return the updated maintenance', async () => {
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

      maintenanceModel.findByIdAndUpdate.mockResolvedValue(updatedMaintenance);

      const result = await service.update('1', updateMaintenanceDto);
      expect(result).toEqual(updatedMaintenance);
    });
  });

  describe('remove', () => {
    it('should delete a maintenance', async () => {
      const deletedMaintenance = { _id: '1', driver: '456' };
      maintenanceModel.findByIdAndDelete.mockResolvedValue(deletedMaintenance);

      const result = await service.remove('1');
      expect(result).toEqual({
        message: `Maintenance with ID 1 successfully deleted`,
      });
    });
  });
});
