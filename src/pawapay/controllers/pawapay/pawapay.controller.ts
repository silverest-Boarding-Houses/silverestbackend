import { Body, Controller, Post } from '@nestjs/common';
import { PawaPayDTO } from 'src/pawapay/DTO/pawapayDTO';
import { PawapayService } from 'src/pawapay/service/pawapay/pawapay.service';

@Controller('pawapay')
export class PawapayController {
    constructor(
        private readonly pawapayService: PawapayService,
    ){}

    @Post()
    async createPayment(@Body() payment:PawaPayDTO){
        try {
            const result = await this.pawapayService.initiatePayment(payment);
            return {success:true, data:result}
            
        } catch (error) {
            return {success:true, message:error.message}
            
        }
        
    }
}
