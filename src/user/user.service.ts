import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      const user = await createdUser.save();
      this.logger.log(`User created with ID: ${user._id}`);
      return user;
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      this.logger.log(`Retrieved ${users.length} users`);
      return users;
    } catch (error) {
      this.logger.error('Error fetching all users', error.stack);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        this.logger.warn(`User not found with ID: ${id}`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      this.logger.log(`User retrieved with ID: ${id}`);
      return user;
    } catch (error) {
      this.logger.error(`Error fetching user with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to fetch user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true },
      );
      if (!updatedUser) {
        this.logger.warn(`User not found for update with ID: ${id}`);
        throw new NotFoundException(`User with ID ${id} not found for update`);
      }
      this.logger.log(`User updated with ID: ${id}`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating user with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        this.logger.warn(`User not found for deletion with ID: ${id}`);
        throw new NotFoundException(
          `User with ID ${id} not found for deletion`,
        );
      }
      this.logger.log(`User deleted with ID: ${id}`);
      return { message: `User with ID ${id} successfully deleted` };
    } catch (error) {
      this.logger.error(`Error deleting user with ID: ${id}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete user');
    }
  }
}
