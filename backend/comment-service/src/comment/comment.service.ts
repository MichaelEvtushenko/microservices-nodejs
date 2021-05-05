import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CommentDto, CreateCommentDto } from './dto';
import { Comment } from './entity';
import { InjectRepository } from '@nestjs/typeorm';

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
