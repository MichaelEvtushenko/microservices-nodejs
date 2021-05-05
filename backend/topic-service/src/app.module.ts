import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-svc', // todo: env var; currently set to k8s service name
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'microservices_db',
      logging: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true, // todo: set to false when deploy to prod
    }),
    TopicModule,
  ],
  controllers: [InfoController],
  providers: [],
})
export class AppModule {
}
