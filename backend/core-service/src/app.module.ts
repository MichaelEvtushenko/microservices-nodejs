import { Module } from '@nestjs/common';
import { AppInfoController } from './app-info.controller';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AppInfoController],
  providers: [],
})
export class AppModule {}
