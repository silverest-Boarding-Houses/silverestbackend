import { Controller, Post, Get, Patch, Delete, Param, Body, Put, ParseIntPipe, BadRequestException } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BoardingHouseService } from './boarding-house.service';
import { boardingHouseDTO } from './DTO/boarding.dto';
import { BoardingHouse } from 'src/Entities/BoardingHouses.Entity';
import { UpdateBookingDto } from 'src/booking-room/DTO/booking.dto';

@ApiTags('BoardingHouse')
@Controller('boardinghouses')
export class BoardingHouseController {
  constructor(private readonly boardingHouseService: BoardingHouseService) {}

  @Post('post')
  @ApiOperation({ summary: 'Create a new boarding house' })
  async createBoardingHouse(@Body() boardingHouseDTO: boardingHouseDTO) {
    return this.boardingHouseService.createBoardingHouse(boardingHouseDTO);
  }

  @Get('allhouses')
  @ApiOperation({ summary: 'Get all boarding houses' })
  async getAllBoardingHouses() {
    return this.boardingHouseService.getAllBoardingHouses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get boarding house by ID' })
  async getBoardingHouseById(@Param('id') id: number) {
    return this.boardingHouseService.getBoardingHouseById(id);
  }

  @Get('search-name/:name')
  @ApiOperation({ summary: 'Search house by name' })
  @ApiResponse({ status: 200, description: 'Boarding house found successfully' })
  async findHouseByName(@Param('name') name: string): Promise<BoardingHouse[]> {
    return this.boardingHouseService.findHouseByName(name);
  }


  @Get('search-price/:Price')
  @ApiOperation({ summary: 'Search house by price' })
  @ApiResponse({ status: 200, description: 'Boarding house price found successfully' })
  async findHouseByPrice(@Param('Price') Price: string): Promise<BoardingHouse[]> {
    const priceAsNumber = Number(Price);
    if (isNaN(priceAsNumber)) {
      throw new BadRequestException('Invalid price value provided');
    }
    return this.boardingHouseService.findHouseByPrice(priceAsNumber);
  }
  
  @Get('search-Location/:Location')
  @ApiOperation({ summary: 'Search house by Location' })
  @ApiResponse({ status: 200, description: 'Boarding house Location found successfully' })
  async findHouseByLocation(@Param('Location') Location: string): Promise<BoardingHouse[]> {
    return this.boardingHouseService.findHouseByLocation(Location);
  }




  @Put(':id')

  @ApiOperation({ summary: 'Update boarding house details' })
  @ApiResponse({ status: 200, description: 'house details updated successfully' })
  async updateOrdersById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedhouseDto:boardingHouseDTO,
  ): Promise<{ message: string }> {
    await this.boardingHouseService.updateBoardingHouseById(
      id,
      updatedhouseDto,
    );
    return { message: 'boarding house details updated successfully' };
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a boarding house' })
  async deleteBoardingHouse(@Param('id') id: number) {
    await this.boardingHouseService.deleteBoardingHouse(id);
    return 'boarding house deleted successfully'
  }
}

