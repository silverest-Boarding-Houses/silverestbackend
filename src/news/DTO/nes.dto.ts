import { ApiProperty } from "@nestjs/swagger";

export class NewsDTO{
    @ApiProperty({ description: 'news id' })
    id:number;
    @ApiProperty({ description: 'image and heading' })
    image:string
    @ApiProperty({ description: 'content about news' })
    content:string
    @ApiProperty({ description: 'date of publishing news' })
    date:Date
}