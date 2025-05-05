import { Test, TestingModule } from '@nestjs/testing';

import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { DeliveryService } from './delivery.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import e from 'express';
import { getModelToken } from '@nestjs/mongoose';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let deliveryModel: any;

  beforeEach(async () => {
    const deliveryModelMock = jest
      .fn()
      .mockImplementation((createDeliveryDto) => ({
        ...createDeliveryDto,
        save: jest.fn().mockResolvedValue({
          _id: '1',
          ...createDeliveryDto,
        }),
      }));

    Object.assign(deliveryModelMock, {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findOne: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryService,
        { provide: getModelToken(Delivery.name), useValue: deliveryModelMock },
      ],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
    deliveryModel = module.get(getModelToken(Delivery.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a delivery', async () => {
      const createDeliveryDto: CreateDeliveryDto = {
        truck: '123',
        driver: '456',
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
        status: 'Pendente',
        deliveryDate: new Date(),
        deliveryDetails: 'Detalhes da entrega',
        distance: 100,
        fuelCost: 10,
      };

      const result = await service.create(createDeliveryDto);

      expect(result).toHaveProperty('_id');
      expect(result.truck).toBe(createDeliveryDto.truck);
      expect(result.driver).toBe(createDeliveryDto.driver);
      expect(result.origin).toBe(createDeliveryDto.origin);
      expect(result.destination).toBe(createDeliveryDto.destination);
      expect(result.status).toBe(createDeliveryDto.status);
      expect(result.deliveryDate).toBe(createDeliveryDto.deliveryDate);
      expect(result.deliveryDetails).toBe(createDeliveryDto.deliveryDetails);
      expect(result.distance).toBe(createDeliveryDto.distance);
      expect(result.fuelCost).toBe(createDeliveryDto.fuelCost);
    });
  });

  describe('findAll', () => {
    it('should return an array of deliverys', async () => {
      const deliverys = [
        {
          truck: '123',
          driver: '456',
          origin: 'São Paulo',
          destination: 'Rio de Janeiro',
          status: 'Pendente',
          deliveryDate: new Date(),
          deliveryDetails: 'Detalhes da entrega',
          distance: 100,
          fuelCost: 10,
        },
      ];
      deliveryModel.find.mockResolvedValue(deliverys);

      const result = await service.findAll();
      expect(result).toEqual(deliverys);
    });
  });

  describe('findOne', () => {
    it('should return a delivery by id', async () => {
      const delivery = {
        truck: '123',
        driver: '456',
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
        status: 'Pendente',
        deliveryDate: new Date(),
        deliveryDetails: 'Detalhes da entrega',
        distance: 100,
        fuelCost: 10,
      };
      deliveryModel.findById.mockResolvedValue(delivery);

      const result = await service.findOne('1');
      expect(result).toEqual(delivery);
    });
  });

  describe('update', () => {
    it('should update and return the updated delivery', async () => {
      const updateDeliveryDto: UpdateDeliveryDto = { status: 'Em andamento' };
      const updatedDelivery = {
        truck: '123',
        driver: '456',
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
        status: 'Em andamento',
        deliveryDate: new Date(),
        deliveryDetails: 'Detalhes da entrega',
        distance: 100,
        fuelCost: 10,
      };

      deliveryModel.findByIdAndUpdate.mockResolvedValue(updatedDelivery);

      const result = await service.update('1', updateDeliveryDto);
      expect(result).toEqual(updatedDelivery);
    });
  });

  describe('remove', () => {
    it('should delete a delivery', async () => {
      const deletedDelivery = { _id: '1', driver: '456' };
      deliveryModel.findByIdAndDelete.mockResolvedValue(deletedDelivery);

      const result = await service.remove('1');
      expect(result).toEqual({
        message: `Delivery with ID 1 successfully deleted`,
      });
    });
  });
});
