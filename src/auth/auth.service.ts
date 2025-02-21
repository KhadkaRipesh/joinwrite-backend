import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async createUser(payload: CreateUserDTO) {
    const { user_email, user_name, password } = payload;
    const user = await this.userService.findOne({ where: { user_email } });

    if (user)
      throw new BadRequestException({ message: 'User already exists.' });

    const hashedPassword = await argon.hash(password);

    const new_user = await this.userService.save({
      user_email,
      user_name,
      password: hashedPassword,
    });

    return new_user;
  }
}
