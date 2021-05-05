import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtEncodedBody {
  id: string; // todo: move from user.service
}

// todo: move to nodejs-shared module to use it across the whole project
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest<Request>();
    const request = context.switchToHttp().getRequest();
    const [bearerHeader, bearerValue] = request.headers['authorization']?.split(' ') || [];

    if (!bearerHeader?.startsWith('Bearer')) {
      return false;
    }

    if (bearerValue) {
      try {
        const payload: JwtEncodedBody = await this.jwtService.verifyAsync(bearerValue);
        const userProp = Symbol.for('user');
        request[userProp] = {
          id: payload.id,
        }; // todo: add type declarations
        return true;
      } catch (err) {
        // todo: add checking on different type of jwt errors
        console.error(err);
        return false;
      }
    }
    throw new UnauthorizedException();
  }
}
