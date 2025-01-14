import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardingHouseService } from './boarding-house.service';
import { BoardingHouseController } from './boarding-house.controller';
import { BoardingHouse } from 'src/Entities/BoardingHouses.Entity'; // Ensure correct path
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';
import { AppModule } from 'src/app.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardingHouse])],
  providers: [BoardingHouseService,AppService],
  controllers: [BoardingHouseController,AppController],
  exports: [BoardingHouseService,AppService],  // Export if needed in other modules
})
export class BoardingHouseModule {}
