import { Module } from '@nestjs/common';
import { AgentController } from './controllers/agent/agent.controller';
import { AgentService } from './services/agent/agent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'src/Entities/Agent.Entity';
import { MulterModule } from '@nestjs/platform-express';
import { NotificationModule } from 'src/notification/notification.module'; 
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent]),
    MulterModule.register({
      dest: './uploads/agents',
    }),
    NotificationModule, // Add NotificationModule here
  ],
  controllers: [AgentController],
  providers: [AgentService, NotificationService],
  exports:[AgentService]
})
export class AgentModule {}
