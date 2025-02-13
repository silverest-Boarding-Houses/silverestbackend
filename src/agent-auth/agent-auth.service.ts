import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AgentAuth } from 'src/Entities/AgentAuth.Entity';
import { AdminDto } from 'src/auth/user.register.dto';
import * as multer from 'multer';

@Injectable()
export class AgentAuthService {
  private readonly saltRounds = 10;
  private readonly jwtSecret = 'your_jwt_secret';

  constructor(
    @InjectRepository(AgentAuth) private readonly agentRepository: Repository<AgentAuth>, // ✅ FIXED
  ) {}

  async createAdmin(username: string, email: string, password: string): Promise<AgentAuth> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const admin = this.agentRepository.create({ username, email, password: hashedPassword });
    return this.agentRepository.save(admin);
  }

  static getMulterOptions() {
    return {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log('Uploading file:', file.originalname);
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        console.log('File type:', file.mimetype);
        if (!allowedTypes.includes(file.mimetype)) {
          cb(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
        } else {
          cb(null, true);
        }
      },
    };
  }

  async findUserByEmail(email: string): Promise<AgentAuth | undefined> {
    return this.agentRepository.findOne({ where: { email } });
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.agentRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  async getAllAdmins(): Promise<AgentAuth[]> {
    return this.agentRepository.find();
  }

  async updateAdmin(id: number, adminDto: AdminDto): Promise<AgentAuth> {
    const admin = await this.agentRepository.findOneBy({ id });
    if (!admin) {
      throw new Error(`Admin with ID ${id} not found`);
    }
    Object.assign(admin, adminDto);
    return this.agentRepository.save(admin);
  }

  async deleteAdmin(id: number): Promise<string> {
    const result = await this.agentRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Agent with ID ${id} not found`);
    }
    return `Agent with ID ${id} has been deleted successfully`;
  }
}
