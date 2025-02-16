import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepoService: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepoService.find();
    return users;
  }
}
