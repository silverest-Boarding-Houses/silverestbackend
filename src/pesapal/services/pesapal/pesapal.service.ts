import { paymentDTO } from './../../DTO/paymentDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { paymentEntity } from 'src/Entities/pesapal_payment.entity';

@Injectable()
export class PesapalService {
  private readonly pesapalUrl: string;
  private readonly consumerKey: string;
  private readonly consumerSecret: string;

  constructor(
    @InjectRepository(paymentEntity)
    private readonly paymentRepository: Repository<paymentEntity>,
    private configService: ConfigService,
  ) {
    this.consumerKey = this.configService.get<string>('PESAPAL_CONSUMER_KEY');
    this.consumerSecret = this.configService.get<string>('PESAPAL_CONSUMER_SECRET');
    this.pesapalUrl =
      this.configService.get<string>('PESAPAL_ENVIRONMENT') === 'sandbox'
        ? 'https://cybqa.pesapal.com/pesapalv3'
        : 'https://pay.pesapal.com/v3';
  }

  async getAccessToken(): Promise<string> {
    const response = await axios.post(
      `${this.pesapalUrl}/api/Auth/RequestToken`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        auth: {
          username: this.consumerKey,
          password: this.consumerSecret,
        },
      },
    );
    return response.data.token;
  }

  async submitOrder(paymentDTO: paymentDTO): Promise<string> {
    const accessToken = await this.getAccessToken();
    const response = await axios.post(
      `${this.pesapalUrl}/api/Transactions/SubmitOrderRequest`,
      paymentDTO,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // Save payment details to the database
    const payment = this.paymentRepository.create({
    
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      status: 'PENDING',
      paymentMethod: 'PESAPAL',
      createdAt: new Date(),
    });
    await this.paymentRepository.save(payment);

    return response.data.redirect_url;
  }
}