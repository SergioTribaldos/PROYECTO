import { Controller, Get, Post, Req, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserMeDto } from './auth-types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userMeDto: UserMeDto) {
    return this.authService.validateUser(userMeDto);
  }

  @Get('token')
  token(@Query('token') token: string) {
    return this.authService.decodeToken(token);
  }
}
