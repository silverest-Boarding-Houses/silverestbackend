import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({description:'enter your username'})
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({description:'enter your password'})
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class agentlogindto{
  @ApiProperty({description:'enter your username'})
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({description:'enter your password'})
  @IsString()
  @IsNotEmpty()
  password: string;
  
}