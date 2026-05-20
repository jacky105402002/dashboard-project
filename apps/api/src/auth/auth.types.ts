import type { UserRole } from '@prisma/client';
import type { Request } from 'express';

export const AUTH_COOKIE_NAME = 'dashboard_admin_token';

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthRequest = Request & {
  user?: SafeUser;
  cookies?: Record<string, string>;
};

export type AuthTokenPayload = {
  sub: string;
  email: string;
  role: UserRole;
};
