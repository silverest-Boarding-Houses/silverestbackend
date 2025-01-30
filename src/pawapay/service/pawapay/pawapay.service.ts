// Fixed imports (corrected path casing and entity name)
import { paymentDTO } from '../../../pesapal/DTO/paymentDto'; // Ensure this path is correct
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PawaPaymentEntity } from 'src/entities/pawapay.entity'; // Fixed entity name and path casing
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

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

    async initiatePayment(paymentData: pawapayD) {
        const url = `${this.baseUrl}/payments`; // Use instance property
        const headers = {
            Authorization: `Bearer ${this.apiKey}`,
        };

        let transaction: PawaPaymentEntity | null = null;

        try {
            // Create transaction
            transaction = this.pawapayTransaction.create({
                ...paymentData,
                status: 'initiated',
            });
            await this.pawapayTransaction.save(transaction);

            // Call PawaPay API
            const response = await firstValueFrom(
                this.httpService.post(url, paymentData, { headers }),
            );

            // Update transaction on success
            transaction.status = 'success';
            await this.pawapayTransaction.save(transaction);

            return response.data;

        } catch (error) { // Fixed catch parameter name
            // Handle transaction update on error
            if (transaction) {
                transaction.status = 'failed';
                await this.pawapayTransaction.save(transaction);
            }
            
            // Throw proper error message
            throw new Error(`Payment failed: ${error.message}`); // Fixed template literal
        }
    }
}