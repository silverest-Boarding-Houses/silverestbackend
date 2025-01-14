import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardingHouse } from 'src/Entities/BoardingHouses.Entity';
import { boardingHouseDTO } from './DTO/boarding.dto';
import { BoardingHouseParams } from 'src/booking-room/utils/types';

@Injectable()
export class BoardingHouseService {
  constructor(
    @InjectRepository(BoardingHouse)
    private readonly boardingHouseRepository: Repository<BoardingHouse>,
  ) {}

  async createBoardingHouse(
    boardingHouseDTO: boardingHouseDTO,
  ): Promise<BoardingHouse> {
    const boardingHouse = this.boardingHouseRepository.create(boardingHouseDTO);
    return this.boardingHouseRepository.save(boardingHouse);
  }

  async getAllBoardingHouses(): Promise<BoardingHouse[]> {
    return this.boardingHouseRepository.find();
  }

  async getBoardingHouseById(id: number): Promise<BoardingHouse> {
    const boardingHouse = await this.boardingHouseRepository.findOne({ where: { id } });
    if (!boardingHouse) {
      throw new NotFoundException(`Boarding House with ID ${id} not found`);
    }
    return boardingHouse;
  }


  async findHouseByLocation(Location: string): Promise<BoardingHouse[]> {
    if (!Location) {
      throw new BadRequestException('Locaation is not provided');
    }

    try {
      const results = await this.boardingHouseRepository
        .createQueryBuilder('House')
        .where('House.Location = :Location', { Location })
        .getMany();

      if (results.length === 0) {
        throw new NotFoundException('Location for the boarding house not found');
      }

      return results;
    } catch (error) {
      console.error('Error finding boarding house by location:', error);
      throw new NotFoundException('location for the Boarding house not found');
      
     // throw new InternalServerErrorException('Failed to retrieve boarding house by name.');
    }
  }


  async findHouseByPrice(Price: number): Promise<BoardingHouse[]> {
    if (!Price) {
      throw new BadRequestException('Price is not provided');
    }
  
    try {
      const results = await this.boardingHouseRepository
        .createQueryBuilder('House')
        .where('House.Price = :Price', { Price })
        .getMany();
  
      if (results.length === 0) {
        throw new NotFoundException(`No boarding houses found for the price ${Price}`);
      }
  
      return results;
    } catch (error) {
      console.error('Error finding boarding house by price:', error);
      throw new InternalServerErrorException('Failed to retrieve boarding house by price.');
    }
  }


  async findHouseByName(HouseName: string): Promise<BoardingHouse[]> {
    if (!HouseName) {
      throw new BadRequestException('House Name is not provided');
    }

    try {
      const results = await this.boardingHouseRepository
        .createQueryBuilder('House')
        .where('House.HouseName = :HouseName', { HouseName })
        .getMany();

      if (results.length === 0) {
        throw new NotFoundException('Boarding house not found');
      }

      return results;
    } catch (error) {
      console.error('Error finding boarding house by name:', error);
      throw new NotFoundException('Boarding house not found');
      
     // throw new InternalServerErrorException('Failed to retrieve boarding house by name.');
    }
  }

  async updateBoardingHouseById(
    id: number,
    updatedOrderDetails: BoardingHouseParams,
  ): Promise<void> {
    try {
      // Find the existing booking to ensure it exists
      const existingBooking = await this.boardingHouseRepository.findOne({ where: { id } });
  
      if (!existingBooking) {
        throw new NotFoundException(`Boarding house with ID ${id} not found`);
      }
  
      // Build the partial update object dynamically
      const updateObject: Partial<BoardingHouseParams> = {};
  
      if (updatedOrderDetails.HouseName !== undefined) {
        updateObject.HouseName = updatedOrderDetails.HouseName;
      }
      if (updatedOrderDetails.LandlordPhoneNumber!== undefined) {
        updateObject.LandlordPhoneNumber= updatedOrderDetails.LandlordPhoneNumber;
      }
  
  
      if (updatedOrderDetails.RoomType !== undefined) {
        updateObject.RoomType = updatedOrderDetails.RoomType;
      }
  
      if (updatedOrderDetails.RoomNumber !== undefined) {
        updateObject.RoomNumber = updatedOrderDetails.RoomNumber;
      }
  
      if (updatedOrderDetails.GenderCategory!== undefined) {
        updateObject.GenderCategory= updatedOrderDetails.GenderCategory;
      }


      if (updatedOrderDetails.Location!== undefined) {
        updateObject.Location= updatedOrderDetails.Location;
      }
  
      if (updatedOrderDetails.Status!== undefined) {
        updateObject.Status = updatedOrderDetails.Status;
      }
  
      if (updatedOrderDetails.Price !== undefined) {
        updateObject.Price = updatedOrderDetails.Price;
      }
      if (updatedOrderDetails.BookingFee !== undefined) {
        updateObject.BookingFee = updatedOrderDetails.BookingFee;
      }
  
      // Perform the update if there is at least one field to change
      if (Object.keys(updateObject).length > 0) {
        await this.boardingHouseRepository.update(id, updateObject);
      }
    } catch (error) {
      console.error(`Error while updating a booking by ID: ${error.message}`);
      throw new Error(`Error while updating a booking by ID: ${error.message}`);
    }
  }

  
  async deleteBoardingHouse(id: number): Promise<void> {
    const result = await this.boardingHouseRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException(`Boarding House with ID ${id} not found`);
    }
  }
}
