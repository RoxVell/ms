import {
  CanActivate,
  ExecutionContext, HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    try {
      const req = context.switchToHttp().getRequest();
      const token = this.getTokenFromRequest(req);
      req.user = this.jwtService.verify(token);
      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
    }
  }

  private getTokenFromRequest(request): string {
    const authHeader = request.headers.authorization;
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    return token;
  }
}
