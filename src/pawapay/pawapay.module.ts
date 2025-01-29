import { Module } from '@nestjs/common';
import { PawapayController } from './controllers/pawapay/pawapay.controller';
import { PawapayService } from './service/pawapay/pawapay.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([])],
  controllers: [PawapayController],
  providers: [PawapayService]
})
export class PawapayModule {}
