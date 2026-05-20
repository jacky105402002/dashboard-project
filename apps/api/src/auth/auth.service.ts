import { ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';
import { PrismaService } from '../prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { AUTH_COOKIE_NAME, AuthTokenPayload, SafeUser } from './auth.types';

const TOKEN_TTL = '7d';
const TOKEN_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;
const PASSWORD_COST = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async getSetupStatus() {
    return { hasAdmin: (await this.prisma.user.count()) > 0 };
  }

  async register(dto: RegisterDto, response: Response) {
    const userCount = await this.prisma.user.count();
    if (userCount > 0) {
      throw new ForbiddenException('Admin registration is already closed.');
    }

    const passwordHash = await bcrypt.hash(dto.password, PASSWORD_COST);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        passwordHash,
      },
    });

    await this.setSessionCookie(response, user);
    return this.toSafeUser(user);
  }

  async login(dto: LoginDto, response: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.trim().toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    await this.setSessionCookie(response, user);
    return this.toSafeUser(user);
  }

  logout(response: Response) {
    const { maxAge: _maxAge, ...cookieOptions } = this.getCookieOptions();
    response.clearCookie(AUTH_COOKIE_NAME, cookieOptions);
    return { ok: true };
  }

  async verifyToken(token?: string): Promise<SafeUser> {
    if (!token) {
      throw new UnauthorizedException('Authentication required.');
    }

    let payload: AuthTokenPayload;
    try {
      payload = await this.jwt.verifyAsync<AuthTokenPayload>(token, {
        secret: this.getJwtSecret(),
      });
    } catch {
      throw new UnauthorizedException('Authentication required.');
    }

    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException('Authentication required.');
    }

    return this.toSafeUser(user);
  }

  private async setSessionCookie(response: Response, user: User) {
    const token = await this.jwt.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      } satisfies AuthTokenPayload,
      {
        secret: this.getJwtSecret(),
        expiresIn: TOKEN_TTL,
      },
    );

    response.cookie(AUTH_COOKIE_NAME, token, this.getCookieOptions());
  }

  private toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  private getJwtSecret() {
    const secret = this.config.get<string>('JWT_SECRET');
    if (secret) {
      return secret;
    }

    if (this.config.get<string>('NODE_ENV') === 'production') {
      throw new InternalServerErrorException('JWT_SECRET is not configured.');
    }

    return 'local-dev-only-change-in-production';
  }

  private getCookieOptions() {
    const secure = this.config.get<string>('COOKIE_SECURE') !== 'false';
    const sameSite = this.config.get<'lax' | 'strict' | 'none'>('COOKIE_SAME_SITE') ?? (secure ? 'none' : 'lax');

    return {
      httpOnly: true,
      secure,
      sameSite,
      path: '/',
      maxAge: TOKEN_MAX_AGE_MS,
    } as const;
  }
}
