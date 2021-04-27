import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto';
import { User } from './entity';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { generateAccessToken } from './utils';

// todo: refactor, split into different concerned services
export interface IUserService {
  createUser(dto: CreateUserDto): Promise<void>;

  login(dto: LoginDto): Promise<LoginResponseDto>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
  }

  async createUser(dto: CreateUserDto): Promise<void> {
    await this.userRepo.save({
      email: dto.email,
      fullName: dto.fullName,
      passwordHash: await hash(dto.password, 12), // todo: move salt value to env
    });
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const userByEmail = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!userByEmail) {
      throw new UnauthorizedException('User with such email doesn\'t exist.');
    }

    const isPasswordSame = compare(dto.password, userByEmail.passwordHash);
    if (!isPasswordSame) {
      throw new UnauthorizedException('Wrong credentials. Please, try again.');
    }

    return {
      token: generateAccessToken(userByEmail.id),
    };
  }


}
