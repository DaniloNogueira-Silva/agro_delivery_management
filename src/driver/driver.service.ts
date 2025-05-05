import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  private readonly logger = new Logger(DriverService.name);

  constructor(
    @InjectModel(Driver.name)
    private readonly driverModel: Model<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      this.logger.log('Creating a new driver');
      const createdDriver = new this.driverModel(createDriverDto);
      const driver = await createdDriver.save();
      this.logger.log('Driver created successfully');
      return driver;
    } catch (error) {
      this.logger.error('Error creating driver', error.stack);
      throw new InternalServerErrorException('Failed to create driver');
    }
  }

  async findAll() {
    try {
      const drivers = await this.driverModel.find();
      this.logger.log(`Retrieved ${drivers.length} drivers`);
      return drivers;
    } catch (error) {
      this.logger.error('Error fetching all drivers', error.stack);
      throw new InternalServerErrorException('Failed to fetch drivers');
    }
  }

  async findOne(id: string) {
    try {
      const driver = await this.driverModel.findById(id);
      if (!driver) {
        this.logger.warn(`Driver not found with ID: ${id}`);
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
      this.logger.log(`Driver retrieved with ID: ${id}`);
      return driver;
    } catch (error) {
      this.logger.error(`Error fetching driver with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch driver');
    }
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    try {
      const updatedDriver = await this.driverModel.findByIdAndUpdate(
        id,
        updateDriverDto,
        { new: true },
      );
      if (!updatedDriver) {
        this.logger.warn(`Driver not found for update with ID: ${id}`);
        throw new NotFoundException(`Driver with ID ${id} not found for update`);
      }
      this.logger.log(`Driver updated with ID: ${id}`);
      return updatedDriver;
    } catch (error) {
      this.logger.error(`Error updating driver with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update driver');
    }
  }

  async remove(id: string) {
    try {
      const deletedDriver = await this.driverModel.findByIdAndDelete(id);
      if (!deletedDriver) {
        this.logger.warn(`Driver not found for deletion with ID: ${id}`);
        throw new NotFoundException(
          `Driver with ID ${id} not found for deletion`,
        );
      }
      this.logger.log(`Driver deleted with ID: ${id}`);
      return { message: `Driver with ID ${id} successfully deleted` };
    } catch (error) {
      this.logger.error(`Error deleting driver with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete driver');
    }
  }
}
