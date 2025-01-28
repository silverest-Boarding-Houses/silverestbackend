import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class paymentEntity {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated primary key

  @Column()
  orderId: string; // Unique order ID (from Pesapal)

  @Column()
  amount: number; // Payment amount

  @Column()
  currency: string; // Currency (e.g., ZMW)

  @Column()
  description: string; // Payment description

  @Column()
  status: string; // Payment status (e.g., PENDING, COMPLETED, FAILED)

  @Column()
  paymentMethod: string; // Payment method (e.g., MOBILE_MONEY, CARD)

  @Column()
  callbackUrl: string; // Callback URL for payment notifications

  @Column({ nullable: true })
  notificationId: string; // Optional notification ID

  @Column({ type: 'json', nullable: true })
  billingAddress: {
    emailAddress: string; // Customer email
    phoneNumber?: string; // Customer phone number (optional)
    countryCode?: string; // Country code (optional)
  };

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp of payment creation

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date; // Timestamp of payment update
}