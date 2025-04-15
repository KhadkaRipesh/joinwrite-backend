import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async getAllUsers() {
    const users = await this.find();
    return users;
  }
}
