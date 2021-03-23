import { Controller, Get } from '@nestjs/common';
import * as os from 'os';

const { version, name } = require('../package.json');

interface AppInfo {
  name: string;
  version: number;
  hostname: string;
  localDate: string;
  docs: string;
}

@Controller()
export class AppController {
  @Get()
  getAppInfo(): AppInfo {
    return {
      name,
      version,
      docs: '/api-docs/',
      hostname: os.hostname(),
      localDate: new Date().toString(),
    };
  }
}
