import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/auth')
@ApiTags('Auth')
export class AuthController {

  private lag: number = 0;

  @Get('/token')
  @ApiOkResponse({ description: 'Returns fake token.' })
  async getByToken(): Promise<{ token: string, iat: Date }> {
    this.lag && console.log(`sleeping for ${(this.lag)} ms...`);
    await new Promise(resolve => setTimeout(() => resolve(null), this.lag));
    return {
      token: '🖐',
      iat: new Date(),
    };
  }

  @Get('/break')
  @ApiOkResponse({ description: 'Set lag time to 10 seconds.' })
  breakApp(): { lag: number } {
    this.lag = 10000; // 10s
    return {
      lag: this.lag,
    };
  }

  @Get('/reset')
  @ApiOkResponse({ description: 'Reset lag time to 0 seconds.' })
  reset(): { lag: number } {
    this.lag = 0;
    return {
      lag: this.lag,
    };
  }
}
