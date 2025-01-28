import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { paymentDTO } from 'src/pesapal/DTO/paymentDto';
import { PesapalService } from 'src/pesapal/services/pesapal/pesapal.service';


@ApiTags('Payment Handler')
@Controller('pesapal')
export class PesapalController {
    constructor(private readonly pesapalService:PesapalService){}

    @Post()
     async submitOrder(@Body() paymentDTO:paymentDTO, ){
        const redirect_url= await this.pesapalService.submitOrder(paymentDTO)
     }
}
