import { Controller, Post, Get, Delete, Param, Body, Query, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingRoom } from 'src/Entities/Booking.Entity';
import { BookingRoomService } from './booking-room.service';
import { bookingdto, selectedDateDTO, UpdateBookingDto } from './DTO/booking.dto';

@ApiTags('Booking a Room')
@Controller('bookings')
export class BookingRoomController {
  constructor(private readonly bookingService: BookingRoomService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new booking' })
  async createBooking(@Body() bookingdto: bookingdto): Promise<BookingRoom> {
    return this.bookingService.createBooking(bookingdto);
  }
  @Get('byselectedDate')
  @ApiOperation({
    summary: 'Get booking transaction by selected date',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns booking transaction by selected date',
  })
  
  async getOrderTransactionsSelectedByDate(@Query() selectedDateDTO: selectedDateDTO) {
    const { BookingDate} = selectedDateDTO; // Extract the date from the DTO
    console.log(`Request received for date: ${BookingDate}`);  // Logging the incoming request
    try {
      const transactions = await this.bookingService.findBookingBySelectedDate(BookingDate);
      return transactions;
    } catch (error) {
      console.error('Error retrieving booking transactions:', error);
      return {
        message: 'Error retrieving booking transactions for the selected date.',
        error: error.message,
      };
    }
  }
     
  @Get('/todayBookings')
  @ApiOperation({summary:'Get all bookings for the current day'})
  @ApiResponse({ status: 200, description: 'return all booking by current day ' })
  async getOrdersByDay():Promise<BookingRoom[] | string> {
    return  await this.bookingService.findAllBookingsByCurrentDay();
  }

  @Get('total-bookingfee-today')
  @ApiOperation({
    summary: 'Get total amount  for the current day',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns total amount for the current day',
  })


  @Get('total-amount-today')
  async getTotalAmountToday(): Promise<{ totalAmount: number }> {
    const totalAmount = await this.bookingService.findTotalAmountOfCurrentDay();
    return { totalAmount };
  }
  
  

  @Get('number/:BookingNumber')
  @ApiOperation({ summary: 'Find booking by Booking Number' })
  async findBookingByNumber(@Param('BookingNumber') BookingNumber: string): Promise<BookingRoom | string> {
    return this.bookingService.findBookingByNumber(BookingNumber);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  async getAllBookings(): Promise<BookingRoom[]> {
    return this.bookingService.getAllBookings();
  }

  @Put(':id')

  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({ status: 200, description: 'boooking updated successfully' })
  async updateOrdersById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedBookDto:UpdateBookingDto,
  ): Promise<{ message: string }> {
    await this.bookingService.updateBookingsById(
      id,
      updatedBookDto,
    );
    return { message: 'booking updated successfully' };
  }


@Delete(':id')
  @ApiOperation({ summary: 'Cancel a booking' })
  async cancelBooking(@Param('id') id: number): Promise<string> {
    await this.bookingService.cancelBooking(id);
    return 'Booking cancelled successfully';
  }
  
  
}
