import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('agent')

export class Agent{
    @ApiProperty({description:'identifier'})
    @PrimaryGeneratedColumn()
     id: number;

     @ApiProperty({description:'first name'})
     @Column()
     firstname:string

     @ApiProperty({description:'last name'})
     @Column()
     lastname:string;

     @ApiProperty({description:'email'})
     @Column()
     email:string

     @ApiProperty({description:'phone number'})
     @Column()
     phonenumber:string

     @ApiProperty({description:'residential area'})
     @Column()

     ResdencialArea:string
     @ApiProperty({description:'agent experience'})
     @Column()
     professionalBackground:string
     
     @ApiProperty()
     @Column()
     profileImage?:string

      @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
}