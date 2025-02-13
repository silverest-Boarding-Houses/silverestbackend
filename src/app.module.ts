import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
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
import { PawaPaymentEntity } from './Entities/pawapay.Entity';

import { AgentAuthService } from './agent-auth/agent-auth.service';
import { AgentAuthController } from './agent-auth/agent-auth.controller';
import { AgentAuthModule } from './agent-auth/agent-auth.module';
import { Admin } from './Entities/Admin.Entity'; // ✅ Fixed import
import { AgentAuth } from './Entities/AgentAuth.Entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
   
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'xmcn46t1ld.qo6yibiidz.tsdb.cloud.timescale.com', // Host from the connection information
      port: 34399, // Port from the connection information
      username: 'tsdbadmin', // Username from the connection information
      password: 'ialqp4dnga4sks0x', // Password from the connection information
      database: 'tsdb', // Database name from the connection information
      synchronize: true,  // Use with caution, only in dev environment
      entities: [Admin, BoardingHouse, BookingRoom, News, Agent, paymentEntity, PawaPaymentEntity, AgentAuth],
    
      // ssl: {
      //   rejectUnauthorized: false, // Allow self-signed certificates
      //   ca: fs.readFileSync('certificates/certificate.crt').toString(), // Path to the certificate
      // },
    }),
    
    AuthModule,
    BoardingHouseModule,
    AgentAuthModule, // ✅ Ensure this module is imported
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
