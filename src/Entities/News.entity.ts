import { ApiProperty } from "@nestjs/swagger";
import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')

export class News{

    @ApiProperty({description:'unique identifier'})
    @PrimaryGeneratedColumn()

    id:number;
    
    @ApiProperty({description:'header image of news'})
    @Column()

    image:string
    
    @ApiProperty({description:'content of the news'})
    @Column()
    content:string
     
    @ApiProperty({description:'date the news was posted'})
    @Column()
    date:Date
}