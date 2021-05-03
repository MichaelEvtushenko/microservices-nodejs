import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic, TopicRevision } from './entity';
import { JwtGuard } from './guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic, TopicRevision]),
    JwtModule.register({
      secret: 'jwtConstants.secret', // todo: env
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [TopicController],
  providers: [TopicService, JwtGuard],
})
export class TopicModule {
}
