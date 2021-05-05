import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommentDto, CreateCommentDto } from './dto';
import { Comment } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as amqplib from 'amqplib';

export interface ICommentService {
  createComment(authorId: number, dto: CreateCommentDto): Promise<CommentDto>;

  getComments(postId: number): Promise<CommentDto[]>;
}

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {
  }

  async createComment(authorId: number, dto: CreateCommentDto): Promise<CommentDto> {
    const comment = await this.commentRepo.save({
      postId: dto.postId,
      body: dto.body,
      authorId,
    });

    const commentsByPostId = await this.commentRepo.find({
      where: {
        postId: dto.postId,
      },
    });

    // @ts-ignore
    const contributorIds = [...new Set(commentsByPostId.map(c => c.authorId))];

    // todo: get all emails using contributorIds
    const emails: string[] = ['microservice.app.demo@gmail.com'];

    // todo: refactor, use separate helper for rabbitmq management
    const publishMessageToQueue = async (email: string) => {
      try {
        const content = Buffer.from(JSON.stringify({
          email,
          event: 'new_comment',
        }));

        const connection = await amqplib.connect('amqp://rabbitmq-svc:5672'); // todo: refactor, use singleton
        const channel = await connection.createChannel();

        await channel.assertExchange('notify', 'topic', { durable: true });
        await channel.publish('notify', 'email.new_comment', content);
      } catch (err) {
        console.error('RabbitMQ error:', err);
        throw err;
      }
    };

    const emailPromises = emails.map(email => publishMessageToQueue(email));

    Promise.all(emailPromises)
      .then(() => {
        console.log('Successfully published all messages to RabbitMQ');
      })
      .catch(err => {
        console.error('Failed to asynchronously publish messages to RabbitMQ', err);
      });

    return new CommentDto(comment);
  }

  async getComments(postId: number): Promise<CommentDto[]> {
    const all = await this.commentRepo.find({
      where: {
        postId,
      },
    });

    return all.map(comment => new CommentDto(comment));
  }
}
