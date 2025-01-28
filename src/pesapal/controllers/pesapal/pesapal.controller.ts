import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PesapalService } from 'src/pesapal/services/pesapal/pesapal.service';


@ApiTags('Payment Handler')
@Controller('pesapal')
export class PesapalController {
    constructor(private readonly pesapalService:PesapalService){}

    @Post()
     async submitOrder(){}
}
