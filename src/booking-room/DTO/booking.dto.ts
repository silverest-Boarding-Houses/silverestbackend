import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class bookingdto {
  @ApiProperty({ description: 'Name of the student booking' })
    boardingHouseId:number;




  @ApiProperty({ description: 'Name of the student booking' })
  studentName: string;

  @ApiProperty({ description: 'Email of the student booking' })
  emailAddress: string;

  @ApiProperty({ description: 'Phone number' })
  phoneNumber: string;

  @ApiProperty({ description: 'Booking date' })
  bookingDate: Date;

  @ApiProperty({ description: 'total price' })
  Price: number;


  @ApiProperty({ description: 'Booking fee' })
  BookingFee: number;
}
export class selectedDateDTO {
  @IsDateString()
  BookingDate: string;
}

export class UpdateBookingDto{


  @ApiProperty({ description: 'Name of the student booking' })
  StudentName: string;
  @ApiProperty({ description: 'Email of the student booking' })
  emailAddress: string;
  @ApiProperty({ description: 'Phone number' })
  phoneNumber: string;
  @ApiProperty({ description: 'Booking date' })
  bookingDate: Date;
  @ApiProperty({ description: 'total price' })
  Price: number;
  @ApiProperty({ description: 'Booking fee' })
  BookingFee: number
}

