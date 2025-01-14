import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import *as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';
import { Admin } from 'src/Entities/Admin.Entity';
import { AdminDto } from '../user.register.dto';
//import { Blacklist } from 'src/Entities/Blaclist.Entity';

@Injectable()
export class UserService {
    private readonly saltRounds=10;
    private readonly jwtSecret = 'your_jwt_secret'

    constructor(
        @InjectRepository(Admin) private readonly userRepository:Repository<Admin>,
//@InjectRepository(Blacklist) private readonly blacklistRepository:Repository<Blacklist>
     ){}

     async createAdmin(username:string, email:string, password:string):Promise<Admin>{
        const hashedPassword =await bcrypt.hash(password, this.saltRounds)
        const Admin=this.userRepository.create({username,email, password:hashedPassword})

        return this.userRepository.save(Admin);

     }
     async findUserByEmail(email:string): Promise<Admin | undefined>{
        return this.userRepository.findOne({where:{email}} )

     }
     //method for log in
     async Login(username:string, password:string): Promise<string>{
      const user=await this.userRepository.findOne({where:{username}});

      if(!user||!(await bcrypt.compare(password, user.password))){
         throw new UnauthorizedException('Invalid credentials');

        
      }
      const payload ={username:user.username, sub:user.id};

      return jwt.sign(payload, this.jwtSecret,{expiresIn:'1h'})

     }
     async getAllAdmins(): Promise<Admin[]> {
      return this.userRepository.find();
    }
  
    async updateAdmin(id: number, adminDto: AdminDto): Promise<Admin> {
      const admin = await this.userRepository.findOneBy({ id });
      if (!admin) {
        throw new Error(`Admin with ID ${id} not found`);
      }
      Object.assign(admin, adminDto);
      return this.userRepository.save(admin);
    }
  
    async deleteAdmin(id: number): Promise<string> {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new Error(`Admin with ID ${id} not found`);
      }
      return `Admin with ID ${id} has been deleted successfully`;
    }
  }


