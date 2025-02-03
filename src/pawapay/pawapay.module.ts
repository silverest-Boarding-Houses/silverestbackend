import { Module } from '@nestjs/common';
import { PawapayController } from './controllers/pawapay/pawapay.controller';
import { PawapayService } from './service/pawapay/pawapay.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule, HttpService } from '@nestjs/axios';
import { PawaPaymentEntity } from 'src/Entities/pawapay.Entity';

@Module({
  imports:[TypeOrmModule.forFeature([PawaPaymentEntity]),HttpModule],
  controllers: [PawapayController],
  providers: [PawapayService]
})
export class PawapayModule {}
