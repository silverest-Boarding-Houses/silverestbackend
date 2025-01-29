import { Module } from '@nestjs/common';
import { PawapayController } from './controllers/pawapay/pawapay.controller';
import { PawapayService } from './service/pawapay/pawapay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PawaPaymentEnity } from 'src/Entities/pawapay.Entity';
import { HttpService } from '@nestjs/axios';

@Module({
  imports:[TypeOrmModule.forFeature([PawaPaymentEnity]),HttpService],
  controllers: [PawapayController],
  providers: [PawapayService]
})
export class PawapayModule {}
