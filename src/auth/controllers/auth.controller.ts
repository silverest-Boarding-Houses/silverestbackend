import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../servies/user.service';

import { Request, Response } from 'express';
import { Admin } from 'src/Entities/Admin.Entity';
import { LoginDto } from '../Login.DTO';
import { AdminDto } from '../user.register.dto';

@ApiTags('Admin Registration')
@Controller('auth')
export class AuthController {

    constructor (private readonly userService: UserService) {}

  
    @Post('register')
    @ApiBody({ type: AdminDto }) // Specify the DTO for Swagger
    async register(@Body() adminDto: AdminDto) {
      const user = await this.userService.createAdmin(
        adminDto.username,
        adminDto.email,
        adminDto.password,
      );
      return { user };
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Login successful', schema: { example: { access_token: 'jwt_token' } } })
    async login(@Body() loginDto: LoginDto) {
        const accessToken = await this.userService.Login(loginDto.username, loginDto.password);
        return { access_token: accessToken };
    }
// Get all admins
@Get()
@ApiOperation({ summary: 'Get all admins' })
@ApiResponse({ status: 200, description: 'List of admins', type: [Admin] })
async getAllAdmins() {
  return this.userService.getAllAdmins();
}

// Update admin details
@Put(':id')
@ApiOperation({ summary: 'Update admin details' })
@ApiParam({ name: 'id', description: 'Admin ID', type: 'number' })
@ApiBody({ type: AdminDto })
async updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() adminDto: AdminDto) {
  return this.userService.updateAdmin(id, adminDto);
}

// Delete an admin
@Delete(':id')
@ApiOperation({ summary: 'Delete an admin' })
@ApiParam({ name: 'id', description: 'Admin ID', type: 'number' })
async deleteAdmin(@Param('id', ParseIntPipe) id: number) {
  return this.userService.deleteAdmin(id);
}

 
}
