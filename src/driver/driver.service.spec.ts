import { Test, TestingModule } from '@nestjs/testing';

import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
import { DriverService } from './driver.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { getModelToken } from '@nestjs/mongoose';

describe('DriverService', () => {
  let service: DriverService;
  let driverModel: any;

  beforeEach(async () => {
    const driverModelMock = jest.fn().mockImplementation((createDriverDto) => ({
      ...createDriverDto,
      save: jest.fn().mockResolvedValue({
        _id: '1',
        ...createDriverDto,
      }),
    }));

    Object.assign(driverModelMock, {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findOne: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        { provide: getModelToken(Driver.name), useValue: driverModelMock },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    driverModel = module.get(getModelToken(Driver.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      const result = await service.create(createDriverDto);

      expect(result).toHaveProperty('_id');
      expect(result.name).toBe(createDriverDto.name);
      expect(result.email).toBe(createDriverDto.email);
      expect(result.phone).toBe(createDriverDto.phone);
      expect(result.licenseNumber).toBe(createDriverDto.licenseNumber);
      expect(result.hireDate).toBe(createDriverDto.hireDate);
      expect(result.status).toBe(createDriverDto.status);
      expect(result.assignedTruck).toBe(createDriverDto.assignedTruck);
      expect(result.totalDeliveries).toBe(createDriverDto.totalDeliveries);
      expect(result.licenseExpirationDate).toBe(
        createDriverDto.licenseExpirationDate,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of drivers', async () => {
      const drivers = [{ licensePlate: 'ABC123' }, { licensePlate: 'DEF456' }];
      driverModel.find.mockResolvedValue(drivers);

      const result = await service.findAll();
      expect(result).toEqual(drivers);
    });
  });

  describe('findOne', () => {
    it('should return a driver by id', async () => {
      const driver = {
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
      driverModel.findById.mockResolvedValue(driver);

      const result = await service.findOne('1');
      expect(result).toEqual(driver);
    });
  });

  describe('update', () => {
    it('should update and return the updated driver', async () => {
      const updateDriverDto: UpdateDriverDto = { assignedTruck: '2' };
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

      driverModel.findByIdAndUpdate.mockResolvedValue(updatedDriver);

      const result = await service.update('1', updateDriverDto);
      expect(result).toEqual(updatedDriver);
    });
  });

  describe('remove', () => {
    it('should delete a driver', async () => {
      const deletedDriver = { _id: '1', licensePlate: 'ABC123' };
      driverModel.findByIdAndDelete.mockResolvedValue(deletedDriver);

      const result = await service.remove('1');
      expect(result).toEqual({
        message: `Driver with ID 1 successfully deleted`,
      });
    });
  });
});
