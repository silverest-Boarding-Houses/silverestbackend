import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Put,
    Delete,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { AgentService } from '../../services/agent/agent.service';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { Agent } from 'src/Entities/Agent.Entity';
  import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Agents Application Form')
  @Controller('agents')
  export class AgentController {
    constructor(private readonly agentService: AgentService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new agent' })
    @ApiBody({ type: Agent })
    @ApiResponse({ status: 201, description: 'Agent created successfully.' })
    @UseInterceptors(
      FileInterceptor('profileImage', {
        storage: diskStorage({
          destination: './uploads/agents',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async apply(
      @Body() agentData: Partial<Agent>,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Agent> {
      if (file) {
        agentData.profileImage = file.filename;
      }
      return this.agentService.create(agentData);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all agents' })
    async findAll(): Promise<Agent[]> {
      return this.agentService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get an agent by ID' })
    async findOne(@Param('id') id: number): Promise<Agent> {
      return this.agentService.findOne(id);
    }
  
    @Patch(':id/status')
    @ApiOperation({ summary: 'Update agent status' })
    @ApiBody({ type: Agent })
    async updateStatus(
      @Param('id') id: number,
      @Body('status') status: 'approved' | 'rejected',
    ): Promise<Agent> {
      return this.agentService.updateStatus(id, status);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update an agent' })
    @ApiBody({ type: Agent })
    @ApiResponse({ status: 200, description: 'Agent updated successfully.' })
    @UseInterceptors(
      FileInterceptor('profileImage', {
        storage: diskStorage({
          destination: './uploads/agents',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async update(
      @Param('id') id: number,
      @Body() agentData: Partial<Agent>,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Agent> {
      if (file) {
        agentData.profileImage = file.filename;
      }
      return this.agentService.update(id, agentData);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an agent' })
    @ApiResponse({ status: 200, description: 'Agent deleted successfully.' })
    async remove(@Param('id') id: number): Promise<void> {
      return this.agentService.remove(id);
    }
  }
  