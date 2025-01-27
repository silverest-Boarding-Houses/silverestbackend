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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'silverest',
      entities: [Admin, BoardingHouse, BookingRoom, News, Agent],
      synchronize: true,
    }),
    AuthModule,
    BoardingHouseModule,
    BookingRoomModule,
    NewsModule,
    AgentModule,
    NotificationModule,
    PesapalModule,
    //AgentAuthModule,
  ],
  controllers: [AppController,AuthController,BoardingHouseController,BookingRoomController],
  providers: [AppService],
})
export class AppModule {}
