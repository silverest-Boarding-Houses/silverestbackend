import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin, AgentAuth } from './Entities/Admin.Entity';
import { BoardingHouse } from './Entities/BoardingHouses.Entity';
import { BookingRoom } from './Entities/Booking.Entity';
import { News } from './Entities/News.entity';
import { Agent } from './Entities/Agent.Entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardingHouseModule } from './boarding-house/boarding-house.module';
import { BookingRoomModule } from './booking-room/booking-room.module';
import { NewsModule } from './news/news.module';
import { AgentModule } from './agent/agent.module';
import { NotificationModule } from './notification/notification.module';
import { AuthController } from './auth/controllers/auth.controller';
import { BoardingHouseController } from './boarding-house/boarding-house.controller';
import { BookingRoomController } from './booking-room/booking-room.controller';
import { PesapalModule } from './pesapal/pesapal.module';
import { paymentEntity } from './Entities/pesapal_payment.entity';
import { ConfigModule } from '@nestjs/config';
import { PawapayModule } from './pawapay/pawapay.module';
import {  PawaPaymentEntity } from './Entities/pawapay.Entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
      envFilePath: '.env', // Load the .env file from the root of the project
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Make sure to set the correct password
      database: 'silverest',
      entities: [Admin, BoardingHouse, BookingRoom, News, Agent, paymentEntity,PawaPaymentEntity],
      synchronize: true, // Use with caution in production, as it syncs the DB schema automatically
    }),
    AuthModule,
    BoardingHouseModule,
    BookingRoomModule,
    NewsModule,
    AgentModule,
    NotificationModule,
    PesapalModule,
    PawapayModule,
    //AgentAuthModule,
  ],
  controllers: [AppController, AuthController, BoardingHouseController, BookingRoomController],
  providers: [AppService],
})
export class AppModule {}
