import { Controller, Get } from '@nestjs/common';
import * as os from 'os';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiPrefix } from './constants';

const { version, name } = require('../package.json');

// todo: move to shared module/package
class AppInfo {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly version: number;

  @ApiProperty()
  readonly hostname: string;

  @ApiProperty()
  readonly localDate: string;

  @ApiProperty()
  readonly docs: string;
}

@Controller()
@ApiTags('AppInfo')
export class InfoController {
  @Get()
  getAppInfo(): AppInfo {
    return {
      name,
      version,
      docs: `${ApiPrefix.TOPICS_DOCS}`,
      hostname: os.hostname(),
      localDate: new Date().toString(),
    };
  }
}
