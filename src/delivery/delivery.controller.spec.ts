import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '../auth/auth.guard';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let deliveryService: DeliveryService;
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const mockDeliveryService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [{ provide: DeliveryService, useValue: mockDeliveryService }],
    })
      .overrideGuard(AuthGuard) // Ignorar o AuthGuard nos testes
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<DeliveryController>(DeliveryController);
    deliveryService = module.get<DeliveryService>(DeliveryService);
    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      const expectedResult = { _id: '1', ...createDeliveryDto };

      jest
        .spyOn(deliveryService, 'create')
        .mockResolvedValue(expectedResult as any);

      const result = await controller.create(createDeliveryDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all deliverys', async () => {
      const deliverys = [{ name: 'Delivery1' }, { name: 'Delivery2' }];
      jest
        .spyOn(deliveryService, 'findAll')
        .mockResolvedValue(deliverys as any);

      const result = await controller.findAll();
      expect(result).toEqual(deliverys);
    });
  });

  describe('findOne', () => {
    it('should return a delivery by id', async () => {
      const delivery = { _id: '1', name: 'Delivery' };
      jest.spyOn(deliveryService, 'findOne').mockResolvedValue(delivery as any);

      const result = await controller.findOne('1');
      expect(result).toEqual(delivery);
    });
  });

  describe('update', () => {
    it('should update a delivery', async () => {
      const updateDeliveryDto: UpdateDeliveryDto = {
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

      jest
        .spyOn(deliveryService, 'update')
        .mockResolvedValue(updatedDelivery as any);

      const result = await controller.update('1', updateDeliveryDto);
      expect(result).toEqual(updatedDelivery);
    });
  });

  describe('remove', () => {
    it('should remove a delivery', async () => {
      const expectedResponse = {
        message: 'Delivery with ID 1 successfully deleted',
      };

      jest.spyOn(deliveryService, 'remove').mockResolvedValue(expectedResponse);

      const result = await controller.remove('1');
      expect(result).toEqual(expectedResponse);
    });
  });
});
