import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['USD', 'EUR', 'XAF']) // Example currencies
  currency: string;

  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @IsString()
  @IsNotEmpty()
  transactionId: string;
}