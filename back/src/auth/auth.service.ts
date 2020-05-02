/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from '../../node_modules/bcrypt';
import { UserService } from 'src/user/user.service';
import { UserMeDto, RESPONSE_STATUS, UserMeDtoResponse } from './auth-types';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userMeDto: UserMeDto) {
    const user: User = await this.usersService.findByEmail(userMeDto.email);

    if (
      user &&
      (await this.passwordsAreEqual(user.password, userMeDto.password))
    ) {
      const { password, ...result } = user;
      return this.login(user);
    }
    throw new NotFoundException();
  }

  async login(user: User): Promise<UserMeDtoResponse> {
    const payload = { email: user.email };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      lat: user.lat,
      lng: user.lng,
      access_token: this.jwtService.sign(payload),
      status: RESPONSE_STATUS.OK,
    };
  }

  private async passwordsAreEqual(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async decodeToken(token: string): Promise<UserMeDtoResponse> {
    const decodedToken = this.jwtService.verify(token);
    const user: User = await this.usersService.findByEmail(decodedToken.email);

    delete user.password;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      lat: user.lat,
      lng: user.lng,
      access_token: token,
      status: RESPONSE_STATUS.OK,
    };
  }
}
