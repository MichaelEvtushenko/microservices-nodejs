import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CommentModule,
  ],
  controllers: [InfoController],
  providers: [],
})
export class AppModule {
}
