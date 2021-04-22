import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic, TopicRevision } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, TopicRevision])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {
}
