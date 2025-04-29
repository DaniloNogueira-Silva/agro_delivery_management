import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const mockUserService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    })
      .overrideGuard(AuthGuard) // Ignorar o AuthGuard nos testes
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { name: 'Test', email: 'test@test.com', password: 'password' };
      const expectedResult = { _id: '1', ...createUserDto };

      jest.spyOn(userService, 'create').mockResolvedValue(expectedResult as any);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ name: 'User1' }, { name: 'User2' }];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users as any);

      const result = await controller.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { _id: '1', name: 'User' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user as any);

      const result = await controller.findOne('1');
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated' };
      const updatedUser = { _id: '1', name: 'Updated' };

      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser as any);

      const result = await controller.update('1', updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const expectedResponse = { message: 'User with ID 1 successfully deleted' };

      jest.spyOn(userService, 'remove').mockResolvedValue(expectedResponse);

      const result = await controller.remove('1');
      expect(result).toEqual(expectedResponse);
    });
  });
});
