import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // todo: set to false when deploy to prod
    }),
    UserModule,
  ],
  controllers: [InfoController],
  providers: [],
})
export class AppModule {
}
