import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TruckModule } from './truck/truck.module';
import { DriverModule } from './driver/driver.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    TruckModule,
    DriverModule,
    DeliveryModule,
  ],
})
export class AppModule {}
