import { paymentDTO } from './../../../pesapal/DTO/paymentDto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PawaPaymentEnity } from 'src/Entities/pawapay.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class PawapayService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly ConfigService: ConfigService,

        @InjectRepository(PawaPaymentEnity) private  readonly pawapayEntity:Repository<PawaPaymentEnity>,
    ){ }

    async initiatePayment(paymentData:any){

        const url = `${this.ConfigService.get('PAWAPAY_BASE_URL')}/payments`;
        const headers = {
        Authorization: `Bearer ${this.ConfigService.get('PAWAPAY_API_KEY')}`,
        };

        try {

            
            
        } catch (error) {
            
        }


    }
}
