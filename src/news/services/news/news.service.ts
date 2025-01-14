import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/Entities/News.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {

    constructor(
        @InjectRepository(News) private NewsRepository:Repository<News>,
    ){

    }
  
   create(News:News){
    return this.NewsRepository.save(News)
   }

   findAll(): Promise<News[]>{
    return this.NewsRepository.find()

   }

   async remove (id:number){
    await this.NewsRepository.delete(id)
   }
}    
