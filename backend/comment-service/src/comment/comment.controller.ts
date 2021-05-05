import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiPrefix } from '../constants';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';
import { Request as ExpressRequest } from 'express';
import { getCurrentUser } from './utils';
import { JwtGuard } from './guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller(ApiPrefix.COMMENTS)
export class CommentController {
  constructor(private readonly commentService: CommentService) {
  }

  @Get()
  async getComments(@Query('postId') postId: number) {
    return await this.commentService.getComments(postId);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async createComment(@Request() req: ExpressRequest, @Body() dto: CreateCommentDto) {
    const currentUser = getCurrentUser(req);
    return await this.commentService.createComment(currentUser.id, dto);
  }
}
