import { Topic, TopicRevision } from '../entity';

export class TopicDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;

  constructor(topic: Topic, topicRevision: TopicRevision) {
    this.id = topic.id;
    this.title = topic.title;
    this.description = topicRevision.description;
    this.createdAt = topic.createdAt;
    this.updatedAt = topicRevision.createdAt;
  }
}
