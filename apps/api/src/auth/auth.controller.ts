import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AUTH_COOKIE_NAME, AuthRequest } from './auth.types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('setup-status')
  @ApiOkResponse({ description: 'Whether an admin account already exists.' })
  getSetupStatus() {
    return this.auth.getSetupStatus();
  }

  @Post('register')
  @ApiOkResponse({ description: 'Create the first admin account.' })
  register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    return this.auth.register(dto, response);
  }

  @Post('login')
  @ApiOkResponse({ description: 'Log in as the admin user.' })
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    return this.auth.login(dto, response);
  }

  @Post('logout')
  @ApiOkResponse({ description: 'Clear the admin session.' })
  logout(@Res({ passthrough: true }) response: Response) {
    return this.auth.logout(response);
  }

  @Get('me')
  @ApiOkResponse({ description: 'Return the current authenticated admin user.' })
  async me(@Req() request: AuthRequest) {
    return this.auth.verifyToken(request.cookies?.[AUTH_COOKIE_NAME]);
  }
}
