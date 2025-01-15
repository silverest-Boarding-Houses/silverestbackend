import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AdminDto {
  @ApiProperty({ description: 'Username of the admin', example: 'admin123' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email address of the admin', example: 'admin@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the admin account', example: 'securePassword123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class AgentAuthDto{
  @ApiProperty({ description: 'Username of the agent', example: 'agent123' })
  @IsNotEmpty()
  @IsString()
  username: string;


  @ApiProperty({ description: 'Email address of the admin', example: 'admin@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;



@ApiProperty({ description: 'Password for the agent account', example: 'securePassword123'})
@IsNotEmpty()
@IsString()
password: string;


}
