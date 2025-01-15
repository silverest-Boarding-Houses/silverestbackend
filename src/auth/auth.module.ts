import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/Entities/Admin.Entity';

import { UserService } from './servies/user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),

  ],
  controllers: [],
  providers: [UserService],
})
export class AuthModule {}
