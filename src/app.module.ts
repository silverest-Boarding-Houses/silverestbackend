import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Admin } from './Entities/Admin.Entity';
import { BoardingHouse } from './Entities/BoardingHouses.Entity';
import { BoardingHouseController } from './boarding-house/boarding-house.controller';
import { BoardingHouseService } from './boarding-house/boarding-house.service';
import { BoardingHouseModule } from './boarding-house/boarding-house.module';
import { BookingRoomModule } from './booking-room/booking-room.module';
import { BookingRoom } from './Entities/Booking.Entity';
import { News } from './Entities/News.entity';
import { NewsModule } from './news/news.module';
import { NewsController } from './news/controllers/news/news.controller';
import { Agent } from './Entities/Agent.Entity';
import { AgentModule } from './agent/agent.module';
import { AgentController } from './agent/controllers/agent/agent.controller';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'damascus',
      password: 'kali',
     // url:'postgres://eihtwlii:oErgH5bvc1lJ1yejABFaNx6BTw5V6Cxi@raja.db.elephantsql.com/eihtwlii',
      database: 'silverest',
      entities: [Admin,BoardingHouse,BookingRoom,News,Agent],
      synchronize: true,
    }),
    AuthModule,
    BoardingHouseModule,
    BookingRoomModule,
    NewsModule,
    AgentModule,
    NotificationModule


  ],
  controllers: [AppController, BoardingHouseController,NewsController,AgentController,],
  providers: [AppService],
})
export class AppModule {}
