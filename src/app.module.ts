import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import { ConfigModule } from '@nestjs/config';

// Entities
import { Admin } from './Entities/Admin.Entity';
import { BoardingHouse } from './Entities/BoardingHouses.Entity';
import { BookingRoom } from './Entities/Booking.Entity';
import { News } from './Entities/News.entity';
import { Agent } from './Entities/Agent.Entity';
import { paymentEntity } from './Entities/pesapal_payment.entity';
import { PawaPaymentEntity } from './Entities/pawapay.Entity';
import { AgentAuth } from './Entities/AgentAuth.Entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { BoardingHouseModule } from './boarding-house/boarding-house.module';
import { BookingRoomModule } from './booking-room/booking-room.module';
import { NewsModule } from './news/news.module';
import { AgentModule } from './agent/agent.module';
import { NotificationModule } from './notification/notification.module';
import { PesapalModule } from './pesapal/pesapal.module';
import { PawapayModule } from './pawapay/pawapay.module';
import { AgentAuthModule } from './agent-auth/agent-auth.module';

// Controllers
import { AppController } from './app.controller';
import { AuthController } from './auth/controllers/auth.controller';
import { BoardingHouseController } from './boarding-house/boarding-house.controller';
import { BookingRoomController } from './booking-room/booking-room.controller';
import { AgentAuthController } from './agent-auth/agent-auth.controller';

// Services
import { AppService } from './app.service';
import { AgentAuthService } from './agent-auth/agent-auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cv6t0g56l47c73dbilr0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'paysmart_backend_user',
      password: 'bLg5kfZXFLcuywytNftc566Q7yV0SsY5',
      database: 'paysmart_backend',
      entities:  [Admin, BoardingHouse, BookingRoom, News, Agent, paymentEntity, PawaPaymentEntity, AgentAuth],
      synchronize: true, // Set to false in production
      ssl: true, // Required for Render-hosted PostgreSQL
      extra: {
        ssl: {
          rejectUnauthorized: false, // Avoids SSL issues
        },
      },
    }),

    AuthModule,
    BoardingHouseModule,
    AgentAuthModule,
    BookingRoomModule,
    NewsModule,
    AgentModule,
    NotificationModule,
    PesapalModule,
    PawapayModule,
  ],
  controllers: [AppController, AuthController, BoardingHouseController, BookingRoomController, AgentAuthController],
  providers: [AppService, AgentAuthService],
})
export class AppModule {}
