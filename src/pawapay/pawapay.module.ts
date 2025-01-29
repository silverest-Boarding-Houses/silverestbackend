import { Module } from '@nestjs/common';
import { PawapayController } from './controllers/pawapay/pawapay.controller';
import { PawapayService } from './service/pawapay/pawapay.service';

@Module({
  controllers: [PawapayController],
  providers: [PawapayService]
})
export class PawapayModule {}
