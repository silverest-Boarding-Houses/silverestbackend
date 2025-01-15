import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/Entities/Admin.Entity';

import { UserService } from './servies/user.service';
import { AuthController } from './controllers/auth.controller';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),

  ],
  controllers: [AuthController,AppController],
  providers: [UserService,AppService],
  exports:[UserService,AppService]
})
export class AuthModule {}
