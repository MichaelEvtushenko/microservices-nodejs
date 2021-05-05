import { Comment } from '../entity';

export class CommentDto {
  readonly id: number;
  readonly authorId: number;
  readonly postId: number;
  readonly body: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.authorId = comment.authorId;
    this.postId = comment.postId;
    this.body = comment.body;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }
}
