import { Module } from '@nestjs/common';
import { NewsController } from './controllers/news/news.controller';
import { NewsService } from './services/news/news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/Entities/News.entity';

@Module({
  imports:[TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService],
  exports:[NewsService]
})
export class NewsModule {}
