import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends Repository<User> {
  async getAllUsers() {
    const users = await this.find();
    return users;
  }
}
