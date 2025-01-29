import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class CreatePaymentDto {

  @PrimaryGeneratedColumn()  
  id:number
  
  @Column()
  @ApiProperty()
  amount: number;

 
  @ApiProperty()
  // Example currencies
  currency: string;

  @Column()
  @ApiProperty()
  customerPhone: string;

  @Column()
  @ApiProperty()
  transactionId: string;
}