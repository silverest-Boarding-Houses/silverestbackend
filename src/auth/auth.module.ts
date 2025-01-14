import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controllers/auth.controller';
import { UserService } from './servies/user.service';
import { Admin } from 'src/Entities/Admin.Entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AuthController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
