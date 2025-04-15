import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(payload: CreateUserDTO) {
    const { user_email, user_name, password } = payload;
    const user = await this.userService.findOne({ where: { user_email } });

    if (user)
      throw new BadRequestException({ message: 'User already exists.' });

    const hashedPassword = await argon.hash(password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...new_user } = await this.userService.save({
      user_email,
      user_name,
      password: hashedPassword,
    });

    return new_user;
  }

  async changePassword(user_id: string) {
    const user = await this.userService.findOne({
      where: { user_id },
      select: { password: true },
    });

    return user.password;
  }

  async loginUser(payload: LoginUserDTO) {
    const { user_email, password } = payload;
    const user = await this.userService.findOne({
      where: { user_email },
      select: ['user_id', 'password'],
    });

    if (!user) throw new BadRequestException('Invalid Credentials');

    const validPassword = await argon.verify(user.password, password);

    if (!validPassword) throw new BadRequestException('Invalid Password');

    //  generate jwt token

    const access_token = await this.jwtService.signAsync(
      { sub: user.user_id },
      { secret: process.env.JWT_SECRET },
    );

    return {
      access_token,
      user_id: user.user_id,
    };
  }

  async getUserProfile(user_id: string) {
    const userDetails = await this.userService.findOneBy({ user_id });
    return userDetails;
  }
}
