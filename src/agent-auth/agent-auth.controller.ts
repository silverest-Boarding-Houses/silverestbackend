
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Request, Response, NextFunction } from 'express';

import { Admin } from 'src/Entities/Admin.Entity';

import { FileInterceptor } from '@nestjs/platform-express';
import { AgentAuthService } from './agent-auth.service';
import { AdminDto } from 'src/auth/user.register.dto';
import { LoginDto } from 'src/auth/Login.DTO';

@ApiTags('Agent Registration')
@Controller('agent-auth')
export class AgentAuthController  {

    constructor (private readonly AgentService: AgentAuthService) {}

  
    @Post('register')
    @ApiBody({ type: AdminDto }) // Specify the DTO for Swagger
    async register(@Body() adminDto: AdminDto) {
      const user = await this.AgentService.createAdmin(
        adminDto.username,
        adminDto.email,
        adminDto.password,
      );
      return { user };
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a agent' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Login successful', schema: { example: { access_token: 'jwt_token' } } })
    async login(@Body() loginDto: LoginDto) {
        const accessToken = await this.AgentService.login(loginDto.username, loginDto.password);
        return { access_token: accessToken };
    }
// Get all admins
@Get()
@ApiOperation({ summary: 'Get all agents' })
@ApiResponse({ status: 200, description: 'List of admins', type: [Admin] })
async getAllAdmins() {
  return this.AgentService.getAllAdmins();
}

// Update admin details
@Put(':id')
@ApiOperation({ summary: 'Update agents details' })
@ApiParam({ name: 'id', description: 'Agent ID', type: 'number' })
@ApiBody({ type: AdminDto })
async updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() adminDto: AdminDto) {
  return this.AgentService.updateAdmin(id, adminDto);
}

// @Post(':id/uploadProfileImage')
// @UseInterceptors(FileInterceptor('profileImage', .getMulterOptions())) // Use the correct field name here
// async uploadProfileImage(
//   @Param('id') id: number,
//   @UploadedFile() file: Express.Multer.File,
// ) {
//   if (!file) {
//     throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
//   }
//   return this.AgentService.uploadProfileImage(id, file);
// }

// Delete an admin
@Delete(':id')
@ApiOperation({ summary: 'Delete an agent' })
@ApiParam({ name: 'id', description: 'Agent ID', type: 'number' })
async deleteAdmin(@Param('id', ParseIntPipe) id: number) {
  return this.AgentService.deleteAdmin(id);
}

 
}


