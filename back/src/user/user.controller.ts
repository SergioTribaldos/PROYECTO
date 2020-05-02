import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('register')
  register(@Body() userDto: UserDto) {
    return this.userService.register(userDto);
  }
}
