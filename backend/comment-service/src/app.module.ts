import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [CommentModule],
  controllers: [InfoController],
  providers: [],
})
export class AppModule {}
