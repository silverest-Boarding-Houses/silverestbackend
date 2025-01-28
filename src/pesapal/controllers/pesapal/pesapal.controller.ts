import { Controller, Post } from '@nestjs/common';
import { PesapalService } from 'src/pesapal/services/pesapal/pesapal.service';

@Controller('pesapal')
export class PesapalController {
    constructor(private readonly pesapalService:PesapalService){}

    @Post()
     async submitOrder(){}
}
