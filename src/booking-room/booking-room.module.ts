import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingRoomController } from './booking-room.controller';
import { BookingRoom } from 'src/Entities/Booking.Entity';
import { BoardingHouse } from 'src/Entities/BoardingHouses.Entity';
import { BookingRoomService } from './booking-room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingRoom, BoardingHouse]), // Include both entities
  ],
  controllers: [BookingRoomController],
  providers: [BookingRoomService],
  exports: [BookingRoomService], // Export if used in other modules
})
export class BookingRoomModule {}
