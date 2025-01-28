import { config } from 'process';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PesapalService {

    private readonly pesapalUrl: string;
    private readonly consumerKey: string;
    private readonly consumerSecret: string;

    constructor(private configService:ConfigService){
        this.consumerKey = this.configService.get<string>('PESAPAL_CONSUMER_KEY');
        this.consumerSecret = this.configService.get<string>('PESAPAL_CONSUMER_SECRET');

        this.pesapalUrl = this.configService.get<string>('PESAPAL_ENVIRONMENT') === 'sandbox'
        ? 'https://cybqa.pesapal.com/pesapalv3'
        : 'https://pay.pesapal.com/v3';

       
    }
    async getAccessToken():Promise<string>{
        const response = await axios.post(
            `${this.pesapalUrl}/api/Auth/RequestToken`,
             null,
             {
                headers:{
                    'Content-Type': 'application/json',
                     Accept:'application/json',
                     },
                auth:{
                  username:this.consumerKey,
                  password:this.consumerSecret
                }    
             }
        );
        return response.data.token;
    }
   async submitOrder(oderDetails:any):Promise<string>{
      const accessToken = await this.getAccessToken();
       const response = await axios.post(
        `${this.pesapalUrl}/api/Transactions/SubmitOrderRequest`,
        oderDetails,
        {
            headers:{
                'Content-Type': 'application/json',
                Accept:'application/json',
                Authorization:`Bearer ${accessToken}`
            }
        }
    );
    return response.data.redirect_url;
     
   } 
}
