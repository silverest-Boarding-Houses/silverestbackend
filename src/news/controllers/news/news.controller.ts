import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { News } from 'src/Entities/News.entity';
import { NewsDTO } from 'src/news/DTO/nes.dto';
import { NewsService } from 'src/news/services/news/news.service';

@ApiTags('News')
@Controller('news')
export class NewsController {

    constructor( private readonly NewsService:NewsService){
       
    }

    @Post('postnews')
    @ApiOperation({summary:'create news posts'})
    @ApiBody({type:News})
    CreateNews(@Body() News:News ){

        return this.NewsService.create(News)

    }
    @Get()
    @ApiOperation({summary:'get news posts'})
    getAllNews():Promise<NewsDTO[]>{
        return this.NewsService.findAll()

    }
    @Delete(':id')
    @ApiOperation({summary:'delete news posts'})
    removeNews(@Param('id') id:number){

        return this.NewsService.remove(id)

    }


}
