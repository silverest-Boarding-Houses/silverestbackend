import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingRoom } from './Booking.Entity';

@Entity()
export class BoardingHouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  HouseName: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  Location:string

  @Column()
  RoomType: string; // 'single', 'double', etc.

  @Column()
  GenderCategory: string; // 'male', 'female', etc.

  @Column()
  RoomNumber: string;

  @Column('decimal')
  Price: number;

  @Column('decimal')
  BookingFee: number;

  @Column()
  LandlordPhoneNumber: string;

  @Column()
  Status: string;

  @Column({ type: 'int', default: 1 ,nullable:true})
  maxPeople: number; // Max number of people for this room (default is 1)

  @OneToMany(() => BookingRoom, (booking) => booking.boardingHouse)
  bookings: BookingRoom[]; // Establish a one-to-many relationship
}
