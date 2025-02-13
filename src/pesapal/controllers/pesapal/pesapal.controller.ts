import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { paymentDTO } from 'src/pesapal/DTO/paymentDto';
import { PesapalService } from 'src/pesapal/services/pesapal/pesapal.service';

@ApiTags('Pespal Payment')
@Controller('pesapal')
export class PesapalController {
  constructor(private readonly pesapalService: PesapalService) {}

  @Post()
  async submitOrder(@Body() paymentDTO: paymentDTO) {
    try {
      const redirect_url = await this.pesapalService.submitOrder(paymentDTO);
      return { redirect_url };
    } catch (error) {
      console.error('Error in submitting booking:', error);
      throw new Error('Failed to process payment');
    }
  }
}
