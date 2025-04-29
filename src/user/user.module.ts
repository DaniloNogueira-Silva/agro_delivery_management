import { User, UserSchema } from './entities/user.entity';

import { AuthController } from '../auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController], 
  providers: [UserService], 
  exports: [UserService],
})
export class UserModule {}