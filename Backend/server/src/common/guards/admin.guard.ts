import { AuthRequest } from '@common/types/auth-request.type.js';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';



@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request =
      context.switchToHttp().getRequest<AuthRequest>();

    const userRole = request.user?.role?.toString().toLowerCase();

    if (userRole !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}