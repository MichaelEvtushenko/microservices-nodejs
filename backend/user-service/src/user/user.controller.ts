import { Body, Controller, Post } from '@nestjs/common';
import { ApiPrefix } from '../constants';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller(ApiPrefix.USERS)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Post('/register')
  @ApiCreatedResponse({ description: 'User has been successfully created in system.' })
  async createUser(@Body() dto: CreateUserDto) {
    await this.userService.createUser(dto);
  }

  @Post('/login')
  @ApiOkResponse({
    description: 'User has been given an access JWT to perform authorized operations.',
    type: LoginResponseDto,
  })
  async login(@Body() dto: LoginDto) {
    return await this.userService.login(dto);
  }
}
