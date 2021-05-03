import { Body, Controller, Get, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ApiPrefix } from '../constants';
import { CreateTopicDto, TopicDto, UpdateTopicDto } from './dto';
import { TopicService } from './topic.service';
import { JwtGuard } from './guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { getCurrentUser } from './utils/context.util';
import { Request as ExpressRequest } from 'express';

@Controller(ApiPrefix.TOPICS)
export class TopicController {
  constructor(private readonly topicService: TopicService) {
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async createTopic(@Request() req: ExpressRequest, @Body() dto: CreateTopicDto): Promise<TopicDto> {
    const currentUser = getCurrentUser(req);
    return await this.topicService.createTopic(currentUser.id, dto);
  }

  @Put()
  async updateTopic(@Body() dto: UpdateTopicDto): Promise<TopicDto> {
    return await this.topicService.updateTopic(dto);
  }

  @Get()
  async getTopics() {
    return await this.topicService.getTopics();
  }
}
