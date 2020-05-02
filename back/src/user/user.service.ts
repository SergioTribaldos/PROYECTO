import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository } from 'typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import * as bcrypt from '../../node_modules/bcrypt';
import {
  ERROR_MESSAGES,
  SUCCESFUL_MESSAGES,
  RESPONSE_STATUS,
} from './constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(_email: string): Promise<User> {
    const rawUser = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email=:email', { email: _email })
      .addSelect('ST_X(coords)', 'lat')
      .addSelect('ST_Y(coords)', 'lng')
      .getRawOne();

    if (!rawUser) {
      throw new Error('User not found');
    }

    return {
      id: rawUser['user_id'],
      name: rawUser['user_name'],
      email: rawUser['user_email'],
      password: rawUser['user_password'],
      lat: rawUser['lat'],
      lng: rawUser['lng'],
    };
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async register(user: UserDto) {
    let payload = {
      msg: SUCCESFUL_MESSAGES.REGISTER,
      status: RESPONSE_STATUS.OK,
    };

    user.password = bcrypt.hashSync(user.password, 10);

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: user.name,
        email: user.email,
        password: user.password,
        coords: { lat: user.lat, lng: user.lng },
      })
      .execute()
      .catch(err => {
        if (err.code === 'ER_DUP_ENTRY') {
          payload = {
            msg: ERROR_MESSAGES.DUPLICATED_MAIL,
            status: RESPONSE_STATUS.KO,
          };
        }
      });

    return payload;
  }
}
