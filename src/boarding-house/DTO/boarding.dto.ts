import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class boardingHouseDTO {

@ApiProperty({description:'name of the hostel'})
  @IsString()
  HouseName: string;

  @ApiProperty({description:'image of the hostel'})
  @IsString()
  
  image?: string;

  @ApiProperty({description:'1 km away from the campus'})
  @IsString()
  Location: string;

  @ApiProperty({description:'type of room eg single double'})
  @IsString()
  RoomType: string;

  @ApiProperty({description:'male or female room'})
  @IsString()
  GenderCategory:string;

  @ApiProperty({description:'room number eg A444'})
  @IsNumber()
  RoomNumber: string;

  @ApiProperty({description:'total amount of the room'})
  @IsNumber()
  Price: number;

  @ApiProperty({description:'total number of poeple in room'})
  @IsNumber()
  maxPeople: number;

  @ApiProperty({description:'booking fee to be paid'})
  @IsNumber()
  BookingFee: number;
  
  @ApiProperty({description:'landlord phone number'})
  @IsString()
  LandlordPhoneNumber: string;

  @ApiProperty({description:'available or booked'})
  @IsString()
  Status: string;
}
