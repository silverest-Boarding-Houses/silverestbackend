import { ApiProperty } from "@nestjs/swagger";






export class Agent{
    @ApiProperty({description:'identifier'})
  
     id: number;

     @ApiProperty({description:'first name'})
  
     firstname:string

     @ApiProperty({description:'last name'})
  
     lastname:string;

     @ApiProperty({description:'email'})
  
     email:string

     @ApiProperty({description:'phone number'})
  
     phonenumber:string

     @ApiProperty({description:'residential area'})
  

     ResdencialArea:string
     @ApiProperty({description:'agent experience'})
  
     professionalBackground:string
     
     @ApiProperty()
  
     profileImage?:string


     status: 'pending' | 'approved' | 'rejected';
}