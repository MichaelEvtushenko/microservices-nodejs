import { Controller, Get, HttpException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as os from 'os';

@Controller('/api/auth')
@ApiTags('Auth')
export class AuthController {

  private lag: number = 0;
  private sendErrors: boolean = false;

  @Get('/token')
  @ApiOkResponse({ description: 'Returns fake token.' })
  async getByToken(): Promise<{ token: string, iat: Date, host: string }> {
    if (this.sendErrors) {
      console.log(`sending errors...`);
      throw new HttpException({
        message: 'DB has been dropped for 7 seconds...',
        host: os.hostname(),
      }, 500);
    }
    this.lag && console.log(`sleeping for ${(this.lag)} ms...`);
    await new Promise(resolve => setTimeout(() => resolve(null), this.lag));
    return {
      token: '🖐',
      iat: new Date(),
      host: os.hostname(),
    };
  }

  @Get('/turn-lag-on')
  @ApiOkResponse({ description: 'Set lag time to 10 seconds.' })
  breakApp(): { lag: number } {
    this.lag = 10000; // 10s
    return {
      lag: this.lag,
    };
  }

  @Get('/reset')
  @ApiOkResponse({ description: 'Reset lag time to 0 seconds.' })
  reset() {
    this.lag = 0;
    this.sendErrors = false;
    return {
      lag: this.lag,
      sendErrorsFor: this.sendErrors,
    };
  }

  @Get('/turn-errors-on')
  @ApiOkResponse({ description: 'All requests will fail with 5xx errors for 7 seconds.' })
  turnErrorsOn() {
    this.sendErrors = true;
    setTimeout(() => this.sendErrors = false, 7000);
    return {
      sendErrors: this.sendErrors,
    };
  }
}
