import { Module } from '@nestjs/common';
import { PawapayController } from './controllers/pawapay/pawapay.controller';
import { PawapayService } from './service/pawapay/pawapay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PawaPaymentEnity } from 'src/Entities/pawapay.Entity';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports:[TypeOrmModule.forFeature([PawaPaymentEnity]),HttpModule],
  controllers: [PawapayController],
  providers: [PawapayService]
})
export class PawapayModule {}
