// Fixed imports (corrected path casing and entity name)
import { paymentDTO } from '../../../pesapal/DTO/paymentDto'; // Ensure this path is correct
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { PawaPayDTO } from 'src/pawapay/DTO/pawapayDTO';
import { PawaPaymentEntity } from 'src/Entities/pawapay.Entity';

@Injectable()
export class PawapayService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService, // Fixed casing to lowercase

        @InjectRepository(PawaPaymentEntity) // Fixed entity name
        private readonly pawapayTransaction: Repository<PawaPaymentEntity>,
    ) {
        this.apiKey = this.configService.get('PAWAPAY_API_KEY');
        this.baseUrl = this.configService.get('PAWAPAY_BASE_URL');
    }

    async initiatePayment(paymentData: {
        amount: number;
        currency: string;
        customerPhone: string;
        transactionId: string;
      }) {
        const url = `${this.baseUrl}/payments`;
        const headers = { Authorization: `Bearer ${this.apiKey}` };
      
        // Create transaction record
        const transaction = this.pawapayTransaction.create({
          ...paymentData,
          status: 'initiated',
        });
      
        try {
          await this.pawapayTransaction.save(transaction);
      
          const response = await firstValueFrom(
            this.httpService.post(url, paymentData, { headers })
          );
      
          // Update transaction status
          transaction.status = 'success';
          await this.pawapayTransaction.save(transaction);
      
          return response.data;
        } catch (error) {
          // Handle failure
          transaction.status = 'failed';
          await this.pawapayTransaction.save(transaction);
          throw new Error(`Payment failed: ${error.message}`);
        }
      }
}