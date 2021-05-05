import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // todo: env var; currently set to k8s service name
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'microservices_db',
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // todo: set to false when deploy to prod
    }),
    CommentModule,
  ],
  controllers: [InfoController],
  providers: [],
})
export class AppModule {
}
