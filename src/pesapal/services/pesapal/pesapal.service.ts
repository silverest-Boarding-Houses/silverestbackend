import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Buffer } from 'buffer';
import { paymentDTO } from './../../DTO/paymentDto';

@Injectable()
export class PesapalService {
  private readonly logger = new Logger(PesapalService.name);
  private readonly pesapalUrl: string;
  private readonly consumerKey: string = ' v988cq7bMB6AjktYo/drFpe6k2r/y7z3'; // Your actual Consumer Key
  private readonly consumerSecret: string = ' 3p0F/KcY8WAi36LntpPf/Ss0MhQ='; // Your actual Consumer Secret

  constructor(private readonly httpService: HttpService) {
    this.pesapalUrl = 'https://cybqa.pesapal.com/pesapalv3'; // Sandbox URL

    // Log for debugging
    this.logger.log(`Pesapal Consumer Key: ${this.consumerKey}`);
    this.logger.log(`Pesapal Consumer Secret: ${this.consumerSecret ? '****' : 'Missing'}`);
    this.logger.log(`Pesapal Environment URL: ${this.pesapalUrl}`);
  }


  async getAccessToken(): Promise<string> {
    try {
      const credentials = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
  
      this.logger.log(`Encoded Credentials: Basic ${credentials}`);
  
      const response = await firstValueFrom(
        this.httpService.post(`${this.pesapalUrl}/api/Auth/RequestToken`, null, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${credentials}`,
          },
        }),
      );
  
      this.logger.log(`Pesapal Response: ${JSON.stringify(response.data)}`);
      
      return response.data.token;
    } catch (error) {
      this.logger.error('Pesapal Response Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch access token');
    }
  }
  

  // async getAccessToken(): Promise<string> {
  //   try {
  //     const credentials = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');

  //     this.logger.log(`Encoded Credentials: Basic ${credentials}`); // Debugging

  //     const response = await firstValueFrom(
  //       this.httpService.post(`${this.pesapalUrl}/api/Auth/RequestToken`, null, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //           Authorization: `Basic ${credentials}`,
  //         },
  //       }),
  //     );

  //     this.logger.log('Successfully fetched access token');
  //     return response.data.token;
  //   } catch (error) {
  //     this.logger.error('Error fetching access token:', error.response?.data || error.message);
  //     throw new Error('Failed to fetch access token');
  //   }
  // }

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

      this.logger.log('Booking done successfully');
      return response.data.redirect_url;
    } catch (error) {
      this.logger.error('Error submitting Booking:', error.response?.data || error.message);
      throw new Error('Sorry Payment failed');
    }
  }
}
