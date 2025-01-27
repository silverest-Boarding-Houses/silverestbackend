import { config } from 'process';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PesapalService {

    private readonly pesapalUrl: string;
    private readonly consumerKey: string;
    private readonly consumerSecret: string;

    constructor(private configService:ConfigService){
        this.consumerKey = this.configService.get<string>('PESAPAL_CONSUMER_KEY')
    }
}
