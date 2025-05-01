import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTruckDto } from './dto/create-truck.dto';
import { Truck } from './entities/truck.entity';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Injectable()
export class TruckService {
  private readonly logger = new Logger(TruckService.name);

  constructor(
    @InjectModel(Truck.name)
    private readonly truckModel: Model<Truck>,
  ) {}

  async create(createTruckDto: CreateTruckDto): Promise<Truck> {
    try {
      this.logger.log('Creating a new truck');
      const createdTruck = new this.truckModel(createTruckDto);
      const truck = await createdTruck.save();
      this.logger.log('Truck created successfully');
      return truck;
    } catch (error) {
      this.logger.error('Error creating truck', error.stack);
      throw new InternalServerErrorException('Failed to create truck');
    }
  }

  async findAll() {
    try {
      const trucks = await this.truckModel.find();
      this.logger.log(`Retrieved ${trucks.length} trucks`);
      return trucks;
    } catch (error) {
      this.logger.error('Error fetching all trucks', error.stack);
      throw new InternalServerErrorException('Failed to fetch trucks');
    }
  }

  async findOne(id: string) {
    try {
      const truck = await this.truckModel.findById(id);
      if (!truck) {
        this.logger.warn(`Truck not found with ID: ${id}`);
        throw new NotFoundException(`Truck with ID ${id} not found`);
      }
      this.logger.log(`Truck retrieved with ID: ${id}`);
      return truck;
    } catch (error) {
      this.logger.error(`Error fetching truck with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch truck');
    }
  }

  async update(id: string, updateTruckDto: UpdateTruckDto) {
    try {
      const updatedTruck = await this.truckModel.findByIdAndUpdate(
        id,
        updateTruckDto,
        { new: true },
      );
      if (!updatedTruck) {
        this.logger.warn(`Truck not found for update with ID: ${id}`);
        throw new NotFoundException(`Truck with ID ${id} not found for update`);
      }
      this.logger.log(`Truck updated with ID: ${id}`);
      return updatedTruck;
    } catch (error) {
      this.logger.error(`Error updating truck with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update truck');
    }
  }

  async remove(id: string) {
    try {
      const deletedTruck = await this.truckModel.findByIdAndDelete(id);
      if (!deletedTruck) {
        this.logger.warn(`Truck not found for deletion with ID: ${id}`);
        throw new NotFoundException(
          `Truck with ID ${id} not found for deletion`,
        );
      }
      this.logger.log(`Truck deleted with ID: ${id}`);
      return { message: `Truck with ID ${id} successfully deleted` };
    } catch (error) {
      this.logger.error(`Error deleting truck with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete truck');
    }
  }
}
