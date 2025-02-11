import { paymentDTO } from './../../DTO/paymentDto';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Buffer } from 'buffer';

@Injectable()
export class PesapalService {
  private readonly logger = new Logger(PesapalService.name);
  private readonly pesapalUrl: string;
  private readonly consumerKey: string;
  private readonly consumerSecret: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.consumerKey = this.configService.get<string>('PESAPAL_CONSUMER_KEY');
    this.consumerSecret = this.configService.get<string>('PESAPAL_CONSUMER_SECRET');
    this.pesapalUrl =
      this.configService.get<string>('PESAPAL_ENVIRONMENT') === 'sandbox'
        ? 'https://cybqa.pesapal.com/pesapalv3'
        : 'https://pay.pesapal.com/v3';

    // Log for debugging
    this.logger.log(`Pesapal Consumer Key: ${this.consumerKey}`);
    this.logger.log(`Pesapal Consumer Secret: ${this.consumerSecret ? '****' : 'Missing'}`);
    this.logger.log(`Pesapal Environment URL: ${this.pesapalUrl}`);
  }

  async getAccessToken(): Promise<string> {
    try {
      const credentials = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.pesapalUrl}/api/Auth/RequestToken`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Basic ${credentials}`,
            },
          },
        ),
      );

      this.logger.log('Successfully fetched access token');
      return response.data.token;
    } catch (error) {
      this.logger.error('Error fetching access token:', error.response?.data || error.message);
      throw new Error('Failed to fetch access token');
    }
  }

  async submitOrder(paymentDTO: paymentDTO): Promise<string> {
    try {
      const accessToken = await this.getAccessToken();

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.pesapalUrl}/api/Transactions/SubmitOrderRequest`,
          paymentDTO,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        ),
      );

      this.logger.log('Order successfully submitted');
      return response.data.redirect_url;
    } catch (error) {
      this.logger.error('Error submitting order:', error.response?.data || error.message);
      throw new Error('Failed to submit order');
    }
  }
}
