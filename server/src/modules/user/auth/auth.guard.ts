import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Missing Token');

    try {
      const decoded = await this.jwtService.verify(token);

      request.user = decoded;

      //Save data decoded from jwt to request with custom key
      // addRequestContext(request, { user: decoded });
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }

    return false;
  }

  private extractTokenFromHeader = (request: any): string | null => {
    return request.headers['authorization']?.replace('Bearer ', '') || null;
  };
}
