
import { Module } from '@nestjs/common';
import { PesapalService } from './services/pesapal/pesapal.service';
import { PesapalController } from './controllers/pesapal/pesapal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { paymentEntity } from 'src/Entities/pesapal_payment.entity';
import { BookingRoom } from 'src/Entities/Booking.Entity';



@Module({
  imports :[TypeOrmModule.forFeature([paymentEntity,BookingRoom])],
  providers: [PesapalService],
  controllers: [PesapalController]
})
export class PesapalModule {}
