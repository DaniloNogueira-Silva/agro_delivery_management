import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { Maintenance } from './entities/maintenance.entity';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  private readonly logger = new Logger(MaintenanceService.name);

  constructor(
    @InjectModel(Maintenance.name)
    private readonly maintenanceModel: Model<Maintenance>,
  ) {}

  async create(
    createMaintenanceDto: CreateMaintenanceDto,
  ): Promise<Maintenance> {
    try {
      this.logger.log('Creating a new maintenance', createMaintenanceDto);
      const createdMaintenance = new this.maintenanceModel(
        createMaintenanceDto,
      );
      const maintenance = await createdMaintenance.save();
      this.logger.log('Maintenance created successfully');
      return maintenance;
    } catch (error) {
      this.logger.error('Error creating maintenance', error.stack);
      throw new InternalServerErrorException('Failed to create maintenance');
    }
  }

  async findAll() {
    try {
      const maintenances = await this.maintenanceModel.find();
      this.logger.log(`Retrieved ${maintenances.length} maintenances`);
      return maintenances;
    } catch (error) {
      this.logger.error('Error fetching all maintenances', error.stack);
      throw new InternalServerErrorException('Failed to fetch maintenances');
    }
  }

  async findOne(id: string) {
    try {
      const maintenance = await this.maintenanceModel.findById(id);
      if (!maintenance) {
        this.logger.warn(`Maintenance not found with ID: ${id}`);
        throw new NotFoundException(`Maintenance with ID ${id} not found`);
      }
      this.logger.log(`Maintenance retrieved with ID: ${id}`);
      return maintenance;
    } catch (error) {
      this.logger.error(
        `Error fetching maintenance with ID: ${id}`,
        error.stack,
      );
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch maintenance');
    }
  }

  async update(id: string, updateMaintenanceDto: UpdateMaintenanceDto) {
    try {
      const updatedMaintenance = await this.maintenanceModel.findByIdAndUpdate(
        id,
        updateMaintenanceDto,
        { new: true },
      );
      if (!updatedMaintenance) {
        this.logger.warn(`Maintenance not found for update with ID: ${id}`);
        throw new NotFoundException(
          `Maintenance with ID ${id} not found for update`,
        );
      }
      this.logger.log(`Maintenance updated with ID: ${id}`);
      return updatedMaintenance;
    } catch (error) {
      this.logger.error(
        `Error updating maintenance with ID: ${id}`,
        error.stack,
      );
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update maintenance');
    }
  }

  async remove(id: string) {
    try {
      const deletedMaintenance =
        await this.maintenanceModel.findByIdAndDelete(id);
      if (!deletedMaintenance) {
        this.logger.warn(`Maintenance not found for deletion with ID: ${id}`);
        throw new NotFoundException(
          `Maintenance with ID ${id} not found for deletion`,
        );
      }
      this.logger.log(`Maintenance deleted with ID: ${id}`);
      return { message: `Maintenance with ID ${id} successfully deleted` };
    } catch (error) {
      this.logger.error(
        `Error deleting maintenance with ID: ${id}`,
        error.stack,
      );
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete maintenance');
    }
  }
}
