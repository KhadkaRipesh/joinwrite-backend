import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDTO } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly dataSoruce: DataSource) {}

  async createUser(payload: CreateUserDTO) {
    const { user_email, user_name, password } = payload;
    const user = await this.dataSoruce
      .getRepository(User)
      .findOne({ where: { user_email } });

    if (user)
      throw new BadRequestException({ message: 'User already exists.' });

    const hashedPassword = await argon.hash(password);

    const new_user = await this.dataSoruce.getRepository(User).save({
      user_email,
      user_name,
      password: hashedPassword,
    });

    return new_user;
  }
}
