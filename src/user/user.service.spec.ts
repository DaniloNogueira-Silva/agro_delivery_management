import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  let service: UserService;
  let userModel: any;
  let jwtService: any;

  beforeEach(async () => {
    const userModelMock = jest.fn().mockImplementation((createUserDto) => ({
      ...createUserDto,
      save: jest.fn().mockResolvedValue({
        _id: '1',
        ...createUserDto,
      }),
    }));
  
    Object.assign(userModelMock, {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findOne: jest.fn(),
    });
  
    const jwtServiceMock = {
      signAsync: jest.fn(),
    };
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: userModelMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();
  
    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));
    jwtService = module.get(JwtService);
  });
   

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        password: 'password',
        name: 'Test',
        role: 'ADMIN',
      };
    
      const result = await service.create(createUserDto);
    
      expect(result).toHaveProperty('_id');
      expect(result.email).toBe(createUserDto.email);
      expect(result.name).toBe(createUserDto.name);
      expect(result.role).toBe(createUserDto.role);
    
      // Aqui garantimos que a senha foi criptografada
      expect(result.password).not.toBe(createUserDto.password);
      expect(result.password).toMatch(/^\$2[aby]\$.{56}$/); // Expressão regular para validar hash do bcrypt
    });
    
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ name: 'User1' }, { name: 'User2' }];
      userModel.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { _id: '1', name: 'User' };
      userModel.findById.mockResolvedValue(user);

      const result = await service.findOne('1');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      userModel.findById.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        'User with ID 1 not found',
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'UpdatedName' };
      const updatedUser = { _id: '1', name: 'UpdatedName' };

      userModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const result = await service.update('1', updateUserDto);
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if user not found for update', async () => {
      userModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.update('1', { name: 'test' })).rejects.toThrow(
        'User with ID 1 not found for update',
      );
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const deletedUser = { _id: '1', name: 'User' };
      userModel.findByIdAndDelete.mockResolvedValue(deletedUser);

      const result = await service.remove('1');
      expect(result).toEqual({
        message: `User with ID 1 successfully deleted`,
      });
    });

    it('should throw NotFoundException if user not found for deletion', async () => {
      userModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(
        'User with ID 1 not found for deletion',
      );
    });
  });
});
