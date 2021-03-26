import { Controller, Get } from '@nestjs/common';
import * as os from 'os';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

const { version, name } = require('../package.json');

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
export class AppInfoController {
  @Get()
  getAppInfo(): AppInfo {
    return {
      name,
      version,
      docs: '/api/auth/api-docs',
      hostname: os.hostname(),
      localDate: new Date().toString(),
    };
  }
}
