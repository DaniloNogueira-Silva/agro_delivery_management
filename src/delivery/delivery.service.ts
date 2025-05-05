import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    @InjectModel(Delivery.name)
    private readonly deliveryModel: Model<Delivery>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    try {
      this.logger.log('Creating a new delivery', createDeliveryDto);
      const createdDelivery = new this.deliveryModel(createDeliveryDto);
      const delivery = await createdDelivery.save();
      this.logger.log('Delivery created successfully');
      return delivery;
    } catch (error) {
      this.logger.error('Error creating delivery', error.stack);
      throw new InternalServerErrorException('Failed to create delivery');
    }
  }

  async findAll() {
    try {
      const deliverys = await this.deliveryModel.find();
      this.logger.log(`Retrieved ${deliverys.length} deliverys`);
      return deliverys;
    } catch (error) {
      this.logger.error('Error fetching all deliverys', error.stack);
      throw new InternalServerErrorException('Failed to fetch deliverys');
    }
  }

  async findOne(id: string) {
    try {
      const delivery = await this.deliveryModel.findById(id);
      if (!delivery) {
        this.logger.warn(`Delivery not found with ID: ${id}`);
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      this.logger.log(`Delivery retrieved with ID: ${id}`);
      return delivery;
    } catch (error) {
      this.logger.error(`Error fetching delivery with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch delivery');
    }
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    try {
      const updatedDelivery = await this.deliveryModel.findByIdAndUpdate(
        id,
        updateDeliveryDto,
        { new: true },
      );
      if (!updatedDelivery) {
        this.logger.warn(`Delivery not found for update with ID: ${id}`);
        throw new NotFoundException(`Delivery with ID ${id} not found for update`);
      }
      this.logger.log(`Delivery updated with ID: ${id}`);
      return updatedDelivery;
    } catch (error) {
      this.logger.error(`Error updating delivery with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update delivery');
    }
  }

  async remove(id: string) {
    try {
      const deletedDelivery = await this.deliveryModel.findByIdAndDelete(id);
      if (!deletedDelivery) {
        this.logger.warn(`Delivery not found for deletion with ID: ${id}`);
        throw new NotFoundException(
          `Delivery with ID ${id} not found for deletion`,
        );
      }
      this.logger.log(`Delivery deleted with ID: ${id}`);
      return { message: `Delivery with ID ${id} successfully deleted` };
    } catch (error) {
      this.logger.error(`Error deleting delivery with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete delivery');
    }
  }
}
