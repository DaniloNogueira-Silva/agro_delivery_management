import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '../auth/auth.guard';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { UpdateDriverDto } from './dto/update-driver.dto';

describe('DriverController', () => {
  let controller: DriverController;
  let driverService: DriverService;
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const mockDriverService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [{ provide: DriverService, useValue: mockDriverService }],
    })
      .overrideGuard(AuthGuard) // Ignorar o AuthGuard nos testes
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<DriverController>(DriverController);
    driverService = module.get<DriverService>(DriverService);
    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a driver', async () => {
      const createDriverDto: CreateDriverDto = {
        name: 'John Doe',
        email: 'XW6v8@example.com',
        phone: '1234567890',
        licenseNumber: 'ABC123',
        hireDate: new Date(),
        status: 'Ativo',
        assignedTruck: '1',
        totalDeliveries: 0,
        licenseExpirationDate: new Date(),
      };
      const expectedResult = { _id: '1', ...createDriverDto };

      jest
        .spyOn(driverService, 'create')
        .mockResolvedValue(expectedResult as any);

      const result = await controller.create(createDriverDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all drivers', async () => {
      const drivers = [{ name: 'Driver1' }, { name: 'Driver2' }];
      jest.spyOn(driverService, 'findAll').mockResolvedValue(drivers as any);

      const result = await controller.findAll();
      expect(result).toEqual(drivers);
    });
  });

  describe('findOne', () => {
    it('should return a driver by id', async () => {
      const driver = { _id: '1', name: 'Driver' };
      jest.spyOn(driverService, 'findOne').mockResolvedValue(driver as any);

      const result = await controller.findOne('1');
      expect(result).toEqual(driver);
    });
  });

  describe('update', () => {
    it('should update a driver', async () => {
      const updateDriverDto: UpdateDriverDto = {
        name: 'John Doe',
        email: 'XW6v8@example.com',
        phone: '1234567890',
        licenseNumber: 'ABC123',
        hireDate: new Date(),
        status: 'Ativo',
        assignedTruck: '2',
        totalDeliveries: 0,
        licenseExpirationDate: new Date(),
      };
      const updatedDriver = {
        name: 'John Doe',
        email: 'XW6v8@example.com',
        phone: '1234567890',
        licenseNumber: 'ABC123',
        hireDate: new Date(),
        status: 'Ativo',
        assignedTruck: '2',
        totalDeliveries: 0,
        licenseExpirationDate: new Date(),
      };

      jest
        .spyOn(driverService, 'update')
        .mockResolvedValue(updatedDriver as any);

      const result = await controller.update('1', updateDriverDto);
      expect(result).toEqual(updatedDriver);
    });
  });

  describe('remove', () => {
    it('should remove a driver', async () => {
      const expectedResponse = {
        message: 'Driver with ID 1 successfully deleted',
      };

      jest.spyOn(driverService, 'remove').mockResolvedValue(expectedResponse);

      const result = await controller.remove('1');
      expect(result).toEqual(expectedResponse);
    });
  });
});
