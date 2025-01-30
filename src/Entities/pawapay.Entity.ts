import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PawaPaymentEntity {
  @PrimaryGeneratedColumn()  
  id: number;  // Ensure ID is a number
  
  @Column()
  @ApiProperty()
  amount: number;

  @Column() // ✅ Added missing Column
  @ApiProperty()
  currency: string;  

  @Column()
  @ApiProperty()
  customerPhone: string;

  @Column()
  @ApiProperty()
  transactionId: string;

  @Column()
  @ApiProperty()
  status: string;
}
