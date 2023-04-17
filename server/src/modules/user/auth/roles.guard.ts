import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/common/enum';
import { UserService } from '../user.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    console.log(request.user);

    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.getUserById(id);
      return roles.includes(user.role);
    }
    return false;
  }
}
