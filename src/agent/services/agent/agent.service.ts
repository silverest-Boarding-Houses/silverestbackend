import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/Entities/Agent.Entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import emailjs from 'emailjs-com';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
  ) {}

  async create(agentData: Partial<Agent>): Promise<Agent> {
    const agent = this.agentRepository.create(agentData);
    return this.agentRepository.save(agent);
  }

  async findAll(): Promise<Agent[]> {
    return this.agentRepository.find();
  }

  async findOne(id: number): Promise<Agent> {
    return this.agentRepository.findOne({ where: { id } });
  }

  async updateStatus(id: number, status: 'approved' | 'rejected'): Promise<Agent> {
    const agent = await this.findOne(id);
    if (!agent) {
      throw new Error('Agent not found');
    }

    agent.status = status;
    await this.agentRepository.save(agent);

    if (status === 'approved') {
      await this.sendApprovalEmail(agent.email, agent.firstname);
    } else {
      await this.sendRejectionEmail(agent.email, agent.firstname);
    }

    return agent;
  }

  private async sendApprovalEmail(email: string, name: string): Promise<void> {
    const registrationToken = crypto.randomBytes(20).toString('hex');

    const templateParams = {
      name,
      email,
      registration_token: registrationToken,
    };

    emailjs.send(
      'your_service_id',  // Replace with your EmailJS service ID
      'your_template_id', // Replace with your EmailJS template ID
      templateParams,
      'your_user_id'      // Replace with your EmailJS user ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.error('FAILED...', error);
    });
  }

  private async sendRejectionEmail(email: string, name: string): Promise<void> {
    const templateParams = {
      name,
      email,
    };

    emailjs.send(
      'service_4dfgtqk',  // Replace with your EmailJS service ID
      'template_164igy6', // Replace with your EmailJS template ID
      templateParams,
      'your_user_id'      // Replace with your EmailJS user ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.error('FAILED...', error);
    });
  }

  async update(id: number, agentData: Partial<Agent>): Promise<Agent> {
    await this.agentRepository.update(id, agentData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.agentRepository.delete(id);
  }
}
