import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardingHouse } from 'src/Entities/BoardingHouses.Entity';
import { BookingRoom } from 'src/Entities/Booking.Entity';
import { Between, Repository } from 'typeorm';
import { bookingdto } from './DTO/booking.dto';

import { Bookingparams } from './utils/types';

@Injectable()
export class BookingRoomService {
  constructor(
    @InjectRepository(BookingRoom)
    private bookingRoomRepository: Repository<BookingRoom>,
    @InjectRepository(BoardingHouse)
    private boardingHouseRepository: Repository<BoardingHouse>,
  ) {}

  // Private method to generate a unique BookingNumber
  private async generateUniqueOrderNumber(): Promise<string> {
    let isUnique = false;
    let BookingNumber: string;

    while (!isUnique) {
      const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate random number
      BookingNumber = `Silverest${randomNumber}`;

      // Check for uniqueness
      const existingBooking = await this.bookingRoomRepository.findOne({
        where: { BookingNumber },
      });

      if (!existingBooking) {
        isUnique = true;
      }
    }

    return BookingNumber;
  }

  async createBooking(bookingDto: bookingdto): Promise<BookingRoom> {
    // Fetch the boarding house and its details
    const boardingHouse = await this.boardingHouseRepository.findOne({
      where: { id: bookingDto.boardingHouseId },
    });
  
    if (!boardingHouse) {
      throw new NotFoundException('Boarding house not found');
    }
  
    const maxPeople = boardingHouse.maxPeople || 1;
  
    // Fetch current bookings for the boarding house
    const currentBookingsCount = await this.bookingRoomRepository.count({
      where: {
        boardingHouse: { id: bookingDto.boardingHouseId },
      },
    });
  
    // Calculate remaining spaces before saving the booking
    let remainingSpaces = maxPeople - currentBookingsCount;
  
    if (remainingSpaces <= 0) {
      throw new ConflictException('This room is fully booked.');
    }
  
    // Generate a unique booking number
    const BookingNumber = await this.generateUniqueOrderNumber();
  
    // Create the booking
    const booking = this.bookingRoomRepository.create({
      BookingNumber,
      studentName: bookingDto.studentName,
      emailAddress: bookingDto.emailAddress,
      phoneNumber: bookingDto.phoneNumber,
      bookingDate: bookingDto.bookingDate,
      price: bookingDto.Price,
      bookingFee: bookingDto.BookingFee,
      boardingHouse, // Reference the entire BoardingHouse entity
    });
  
    // Save the booking to the database
    await this.bookingRoomRepository.save(booking);
  
    // Recalculate remaining spaces after saving the booking
    remainingSpaces--;
  
    // Log appropriate messages based on remaining spaces
    if (remainingSpaces === 1) {
      console.warn('Hurry up! Be the last one to book this room!');
    } else if (remainingSpaces > 1) {
      console.warn(`Hurry up! Only ${remainingSpaces} bed spaces remaining for this room.`);
    }
  
    // Return the saved booking
    return booking;
  }
  
  


  async findBookingByNumber(BookingNumber: string): Promise<BookingRoom | string> {
    try {
      const booking = await this.bookingRoomRepository.findOne({
        where: { BookingNumber },
      });

      if (!booking) {
        return `Booking with number ${BookingNumber} not found`;
      }

      return booking;
    } catch (error) {
      console.error(`Error while searching for a booking: ${error.message}`);
      throw new Error(`Error while searching for a booking: ${error.message}`);
    }
  }

  async getAllBookings(): Promise<BookingRoom[]> {
    return this.bookingRoomRepository.find({ relations: ['boardingHouse'] });
  }

  async getBookingById(id: number): Promise<BookingRoom> {
    const booking = await this.bookingRoomRepository.findOne({
      where: { id },
      relations: ['boardingHouse'],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }
   // Method to find booking by selected date
   async findBookingBySelectedDate(selectedDate: string) {
    try {
        // Use a query builder to find order transactions on the selected date
        const Booking = await this.bookingRoomRepository.createQueryBuilder('Booking')
            .where('DATE(Booking. BookingDate) = :selectedDate', { selectedDate })
            .getMany();

        return Booking;
    } catch (error) {
        console.error("An error occurred when selecting the chosen date", error);
        throw new Error("Could not retrieve booking transactions for the selected date.");
    }
}
//todays total booking
async findTotalAmountOfCurrentDay(): Promise<number> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const result = await this.bookingRoomRepository
      .createQueryBuilder('bookingRoom') // Alias matches BookingRoom
      .select('SUM(bookingRoom.bookingFee)', 'total') // Match property names
      .where('bookingRoom.bookingDate BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
      .getRawOne();

    return result?.total || 0;
  } catch (error) {
    console.error(`Error while fetching total amount for the current day: ${error.message}`);
    console.error(error.stack);
    throw new Error(`Error while fetching total amount: ${error.message}`);
  }
}



async updateBookingsById(
  id: number,
  updatedOrderDetails: Bookingparams,
): Promise<void> {
  try {
    // Find the existing booking to ensure it exists
    const existingBooking = await this.bookingRoomRepository.findOne({ where: { id } });

    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Build the partial update object dynamically
    const updateObject: Partial<Bookingparams> = {};

    if (updatedOrderDetails.bookingDate !== undefined) {
      updateObject.bookingDate = updatedOrderDetails.bookingDate;
    }

    if (updatedOrderDetails.BookingFee !== undefined) {
      updateObject.BookingFee = updatedOrderDetails.BookingFee;
    }

    if (updatedOrderDetails.StudentName !== undefined) {
      updateObject.StudentName = updatedOrderDetails.StudentName;
    }

    if (updatedOrderDetails.phoneNumber !== undefined) {
      updateObject.phoneNumber = updatedOrderDetails.phoneNumber;
    }

    if (updatedOrderDetails.emailAddress !== undefined) {
      updateObject.emailAddress = updatedOrderDetails.emailAddress;
    }

    if (updatedOrderDetails.Price !== undefined) {
      updateObject.Price = updatedOrderDetails.Price;
    }

    // Perform the update if there is at least one field to change
    if (Object.keys(updateObject).length > 0) {
      await this.bookingRoomRepository.update(id, updateObject);
    }
  } catch (error) {
    console.error(`Error while updating a booking by ID: ${error.message}`);
    throw new Error(`Error while updating a booking by ID: ${error.message}`);
  }
}

async findAllBookingsByCurrentDay(): Promise<BookingRoom[] | string> {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );

  try {
    const orders = await this.bookingRoomRepository.find({
      where: {
        bookingDate: Between(startOfDay, endOfDay),
      },
    });

    if (orders.length === 0) {
      return 'Oops! No Bookings available for today.';
    }
    return orders;
  } catch (error) {
    console.error(`Error while fetching for bookings: ${error.message}`);
    throw new Error(`Error while fetching bookings: ${error.message}`);
  }
}

  

  async cancelBooking(id: number): Promise<void> {
    const booking = await this.getBookingById(id);

    if (!booking.boardingHouse) {
      throw new NotFoundException('Associated boarding house not found');
    }

    // Update the room status
    booking.boardingHouse.Status = 'available';
    await this.boardingHouseRepository.save(booking.boardingHouse);

    // Delete the booking
    await this.bookingRoomRepository.delete(id);
  }
}
