import { ApiProperty } from '@nestjs/swagger';

export class paymentDTO {
  @ApiProperty({
    description: 'Unique order ID',
    example: 'ORDER123',
  })
  id: string; // Unique order ID (should be a string, not a number)

  @ApiProperty({
    description: 'The amount to be paid',
    example: 100,
  })
  amount: number; // Payment amount

  @ApiProperty({
    description: 'Currency (e.g., ZMW for Zambian Kwacha)',
    example: 'ZMW',
  })
  currency: string; // Currency (e.g., ZMW)

  @ApiProperty({
    description: 'Description of the payment',
    example: 'Payment for services',
  })
  description: string; // Payment description

  @ApiProperty({
    description: 'Callback URL for payment notifications',
    example: 'https://yourwebsite.com/callback',
  })
  callback_url: string; // Callback URL

  @ApiProperty({
    description: 'Notification ID (optional)',
    example: 'NOTIF123',
    required: false,
  })
  notification_id?: string; // Optional notification ID

  @ApiProperty({
    description: 'Billing address details',
    example: {
      email_address: 'customer@example.com',
      phone_number: '+260123456789',
      country_code: 'ZM',
    },
  })
  billing_address: {
    email_address: string; // Customer email
    phone_number?: string; // Customer phone number (optional)
    country_code?: string; // Country code (optional)
  };
}
