import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsIn(['zmw']) // Example currencies
  currency: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customerPhone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  transactionId: string;
}