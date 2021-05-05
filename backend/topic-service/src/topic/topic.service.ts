import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto, TopicDto, UpdateTopicDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic, TopicRevision } from './entity';

export interface ITopicService {
  createTopic(authorId: number, dto: CreateTopicDto): Promise<TopicDto>;

  updateTopic(dto: UpdateTopicDto): Promise<TopicDto>;

  getTopics(): Promise<TopicDto[]>;
}

@Injectable()
export class TopicService implements ITopicService {
  constructor(
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
    @InjectRepository(TopicRevision) private topicRevisionRepo: Repository<TopicRevision>,
  ) {
  }

  async createTopic(authorId: number, dto: CreateTopicDto): Promise<TopicDto> {
    const topicRevision = await this.topicRevisionRepo.save({
      description: dto.description,
      previousRevision: undefined,
    });

    const topic = await this.topicRepo.save({
      title: dto.title,
      latestRevision: topicRevision,
      authorId,
    });

    return new TopicDto(topic, topicRevision);
  }

  async updateTopic(dto: UpdateTopicDto): Promise<TopicDto> {
    const topicById = await this.topicRepo.findOne({ where: { id: dto.id } }); // todo: use repo pattern
    if (!topicById) {
      throw new NotFoundException('Topic not found');
    }

    const topicRevision = await this.topicRevisionRepo.save({
      description: dto.description,
      previousRevision: topicById.latestRevision,
    });

    await this.topicRepo.update(dto.id, {
      latestRevision: topicRevision,
    });

    const topic = (await this.topicRepo.findOne(dto.id))!; // todo

    return new TopicDto(topic, topicRevision);
  }

  async getTopics(): Promise<TopicDto[]> {
    const all = await this.topicRepo.find();
    return all.map(topic => new TopicDto(topic, topic.latestRevision));
  }
}
