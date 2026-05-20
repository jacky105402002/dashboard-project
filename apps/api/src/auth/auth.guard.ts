import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_COOKIE_NAME, AuthRequest } from './auth.types';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const token = request.cookies?.[AUTH_COOKIE_NAME];
    request.user = await this.auth.verifyToken(token);
    return true;
  }
}
