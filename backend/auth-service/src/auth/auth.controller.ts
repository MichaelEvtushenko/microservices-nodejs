import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  @Post()
  @ApiOkResponse({ description: 'Auth token generated.', type: AuthDto })
  @ApiUnauthorizedResponse({ description: 'Auth token generation failed. Use admin credentials.' })
  login(@Body() loginDto: LoginDto): AuthDto {
    if (loginDto.username === 'istio' && loginDto.password === 'istio') {
      return {
        token: 'test-service-mesh-istio-token',
      };
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @Get()
  getByToken() {
    return {
      date: new Date().toISOString(),
    };
  }
}
