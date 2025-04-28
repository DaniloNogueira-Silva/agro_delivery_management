import { User, UserSchema } from './entities/user.entity';

import { AuthGuard } from 'src/auth/auth.auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
