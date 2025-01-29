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
    ){

    }
}
