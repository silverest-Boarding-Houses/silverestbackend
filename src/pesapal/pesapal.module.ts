import { Module } from '@nestjs/common';
import { PesapalService } from './services/pesapal/pesapal.service';
import { PesapalController } from './controllers/pesapal/pesapal.controller';

@Module({
  providers: [PesapalService],
  controllers: [PesapalController]
})
export class PesapalModule {}
