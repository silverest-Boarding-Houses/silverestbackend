import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentAuth } from '../Entities/AgentAuth.Entity';  // ✅ Ensure correct import
import { AgentAuthService } from './agent-auth.service';
import { AgentAuthController } from './agent-auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AgentAuth])],  // ✅ Ensure the entity is registered
  providers: [AgentAuthService],
  controllers: [AgentAuthController],
  exports: [AgentAuthService, TypeOrmModule], // ✅ Export TypeOrmModule to be available in AppModule
})
export class AgentAuthModule {}
