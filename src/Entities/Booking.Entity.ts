import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardingHouse } from "./BoardingHouses.Entity";

@Entity()
export class BookingRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  BookingNumber: string;

  @Column()
  studentName: string;

  @Column()
  emailAddress: string;

  @Column()
  phoneNumber: string;

  @Column()
  bookingDate: Date;

  @Column()
  price: number;

  @Column()
  bookingFee: number;

  @ManyToOne(() => BoardingHouse, (boardingHouse) => boardingHouse.bookings, {
    eager: true, // Automatically load referenced BoardingHouse details
  })
  boardingHouse: BoardingHouse;
}
