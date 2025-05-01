import { Test, TestingModule } from '@nestjs/testing';

import { CreateTruckDto } from './dto/create-truck.dto';
import { Truck } from './entities/truck.entity';
import { TruckService } from './truck.service';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { getModelToken } from '@nestjs/mongoose';

describe('TruckService', () => {
  let service: TruckService;
  let truckModel: any;

  beforeEach(async () => {
    const truckModelMock = jest.fn().mockImplementation((createTruckDto) => ({
      ...createTruckDto,
      save: jest.fn().mockResolvedValue({
        _id: '1',
        ...createTruckDto,
      }),
    }));

    Object.assign(truckModelMock, {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findOne: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TruckService,
        { provide: getModelToken(Truck.name), useValue: truckModelMock },
      ],
    }).compile();

    service = module.get<TruckService>(TruckService);
    truckModel = module.get(getModelToken(Truck.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      const result = await service.create(createTruckDto);

      expect(result).toHaveProperty('_id');
      expect(result.licensePlate).toBe(createTruckDto.licensePlate);
      expect(result.type).toBe(createTruckDto.type);
      expect(result.capacity).toBe(createTruckDto.capacity);
      expect(result.lastStatus).toBe(createTruckDto.lastStatus);
      expect(result.nextReview).toBe(createTruckDto.nextReview);
      expect(result.maintenanceCost).toBe(createTruckDto.maintenanceCost);
    });
  });

  describe('findAll', () => {
    it('should return an array of trucks', async () => {
      const trucks = [{ licensePlate: 'ABC123' }, { licensePlate: 'DEF456' }];
      truckModel.find.mockResolvedValue(trucks);

      const result = await service.findAll();
      expect(result).toEqual(trucks);
    });
  });

  describe('findOne', () => {
    it('should return a truck by id', async () => {
      const truck = {
        _id: '1',
        licensePlate: 'ABC123',
        type: 'Refrigerated',
        capacity: 10,
        lastStatus: 'Available',
        nextReview: new Date(),
        maintenanceCost: 100,
      };
      truckModel.findById.mockResolvedValue(truck);

      const result = await service.findOne('1');
      expect(result).toEqual(truck);
    });
  });

  describe('update', () => {
    it('should update and return the updated truck', async () => {
      const updateTruckDto: UpdateTruckDto = { type: 'Refrigerated' };
      const updatedTruck = {
        _id: '1',
        licensePlate: 'ABC123',
        type: 'Refrigerated',
        capacity: 10,
        lastStatus: 'Available',
        nextReview: new Date(),
        maintenanceCost: 100,
      };

      truckModel.findByIdAndUpdate.mockResolvedValue(updatedTruck);

      const result = await service.update('1', updateTruckDto);
      expect(result).toEqual(updatedTruck);
    });
  });

  describe('remove', () => {
    it('should delete a truck', async () => {
      const deletedTruck = { _id: '1', licensePlate: 'ABC123' };
      truckModel.findByIdAndDelete.mockResolvedValue(deletedTruck);

      const result = await service.remove('1');
      expect(result).toEqual({
        message: `Truck with ID 1 successfully deleted`,
      });
    });
  });
});
