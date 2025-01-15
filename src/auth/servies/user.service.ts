import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Admin } from 'src/Entities/Admin.Entity';
import { AdminDto } from '../user.register.dto';
import { extname } from 'path';
import * as fs from 'fs';
import * as multer from 'multer';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  private readonly jwtSecret = 'your_jwt_secret';

  constructor(
    @InjectRepository(Admin) private readonly userRepository: Repository<Admin>,
  ) {}
  
 
  // Method to create an admin
  async createAdmin(username: string, email: string, password: string): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const admin = this.userRepository.create({ username, email, password: hashedPassword });
    return this.userRepository.save(admin);
  }


  async uploadProfileImage(id: number, file: Express.Multer.File): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const profileImageUrl = `http://localhost:3000/uploads/${file.filename}`;
    user.profileImage = profileImageUrl;

    return this.userRepository.save(user);
  }

  //logic to uploadprofile
  static getMulterOptions() {
    return {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log('Uploading file:', file.originalname); // Log file name
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        console.log('File type:', file.mimetype); // Log MIME type
        if (!allowedTypes.includes(file.mimetype)) {
          cb(
            new HttpException('Invalid file type', HttpStatus.BAD_REQUEST),
            false,
          );
        } else {
          cb(null, true);
        }
      },
    };
  }
  



  // Method to find a user by email
  async findUserByEmail(email: string): Promise<Admin | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Login method
  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  // Method to get all admins
  async getAllAdmins(): Promise<Admin[]> {
    return this.userRepository.find();
  }

  // Method to update admin details
  async updateAdmin(id: number, adminDto: AdminDto): Promise<Admin> {
    const admin = await this.userRepository.findOneBy({ id });
    if (!admin) {
      throw new Error(`Admin with ID ${id} not found`);
    }
    Object.assign(admin, adminDto);
    return this.userRepository.save(admin);
  }

  // Method to delete an admin
  async deleteAdmin(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Admin with ID ${id} not found`);
    }
    return `Admin with ID ${id} has been deleted successfully`;
  }

 
}
