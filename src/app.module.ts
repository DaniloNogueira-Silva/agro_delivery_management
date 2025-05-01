import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TruckModule } from './truck/truck.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    TruckModule,
  ],
})
export class AppModule {}
