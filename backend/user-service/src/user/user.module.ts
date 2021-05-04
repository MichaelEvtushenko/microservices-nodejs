import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'jwtConstants.secret', // todo: env
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
}
