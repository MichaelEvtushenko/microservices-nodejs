import { Module } from '@nestjs/common';
import { AppInfoController } from './app-info.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppInfoController],
  providers: [],
})
export class AppModule {}
