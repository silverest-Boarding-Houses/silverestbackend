import { ApiProperty } from "@nestjs/swagger";

export class paymentEntity{

     @ApiProperty(
        
     )
     id:number

     @ApiProperty(
        {
            description:'the amount to be paid',
            example:'100'
            
        }
     )
     amount: number; // Payment amount

     @ApiProperty(
        {
            description:'currency in zambia',
            example:'zmw'
            
        }
     )
        currency: string; // Currency (e.g., ZMW)

        @ApiProperty(  {
            description:'payment status',
            example:'pending'
            
        })
        status: string; // Payment status (e.g., PENDING, COMPLETED, FAILED)

        @ApiProperty(  {
            description:'payment method',
            example:'Mobile'
            
        })
        paymentMethod: string; // Payment method (e.g., MOBILE_MONEY, CARD)

        @ApiProperty()
        createdAt: Date;


}