import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '../auth/auth.guard';
import { CreateTruckDto } from './dto/create-truck.dto';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';
import { UpdateTruckDto } from './dto/update-truck.dto';

describe('TruckController', () => {
  let controller: TruckController;
  let truckService: TruckService;
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const mockTruckService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckController],
      providers: [{ provide: TruckService, useValue: mockTruckService }],
    })
      .overrideGuard(AuthGuard) // Ignorar o AuthGuard nos testes
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TruckController>(TruckController);
    truckService = module.get<TruckService>(TruckService);
    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a truck', async () => {
      const createTruckDto: CreateTruckDto = {
        licensePlate: 'ABC123',
        type: 'Refrigerated',
        capacity: 10,
        lastStatus: 'Available',
        nextReview: new Date(),
        maintenanceCost: 100,
      };
      const expectedResult = { _id: '1', ...createTruckDto };

      jest
        .spyOn(truckService, 'create')
        .mockResolvedValue(expectedResult as any);

      const result = await controller.create(createTruckDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all trucks', async () => {
      const trucks = [{ name: 'Truck1' }, { name: 'Truck2' }];
      jest.spyOn(truckService, 'findAll').mockResolvedValue(trucks as any);

      const result = await controller.findAll();
      expect(result).toEqual(trucks);
    });
  });

  describe('findOne', () => {
    it('should return a truck by id', async () => {
      const truck = { _id: '1', name: 'Truck' };
      jest.spyOn(truckService, 'findOne').mockResolvedValue(truck as any);

      const result = await controller.findOne('1');
      expect(result).toEqual(truck);
    });
  });

  describe('update', () => {
    it('should update a truck', async () => {
      const updateTruckDto: UpdateTruckDto = {
        licensePlate: 'ABC123',
        type: 'Updated',
        capacity: 10,
        lastStatus: 'Available',
        nextReview: new Date(),
        maintenanceCost: 100,
      };
      const updatedTruck = {
        _id: '1',
        licensePlate: 'ABC123',
        type: 'Updated',
        capacity: 10,
        lastStatus: 'Available',
        nextReview: new Date(),
        maintenanceCost: 100,
      };

      jest.spyOn(truckService, 'update').mockResolvedValue(updatedTruck as any);

      const result = await controller.update('1', updateTruckDto);
      expect(result).toEqual(updatedTruck);
    });
  });

  describe('remove', () => {
    it('should remove a truck', async () => {
      const expectedResponse = {
        message: 'Truck with ID 1 successfully deleted',
      };

      jest.spyOn(truckService, 'remove').mockResolvedValue(expectedResponse);

      const result = await controller.remove('1');
      expect(result).toEqual(expectedResponse);
    });
  });
});
