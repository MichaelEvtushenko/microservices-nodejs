import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiPrefix } from '../constants';
import { CreateTopicDto, TopicDto, UpdateTopicDto } from './dto';
import { TopicService } from './topic.service';

@Controller(ApiPrefix.TOPICS)
export class TopicController {
  constructor(private readonly topicService: TopicService) {
  }

  @Post()
  async createTopic(@Body() dto: CreateTopicDto): Promise<TopicDto> {
    return await this.topicService.createTopic(dto);
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
