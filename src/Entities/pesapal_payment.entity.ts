import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()

export class paymentEntity{

    @PrimaryGeneratedColumn()
     id:number

     @Column()
     amount: number; // Payment amount

        @Column()
        currency: string; // Currency (e.g., ZMW)

        @Column()
        status: string; // Payment status (e.g., PENDING, COMPLETED, FAILED)

        @Column()
        paymentMethod: string; // Payment method (e.g., MOBILE_MONEY, CARD)

        @Column()
        createdAt: Date;


}