import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginUserDTO } from './dto/auth.dto';
import { GetUser } from 'src/@decoraters/getUser.decorater';
import { JwtAuthGuard } from 'src/@guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  createUser(@Body() payload: CreateUserDTO) {
    return this.authService.createUser(payload);
  }

  @Get('change-password/:user_id')
  changePassword(
    @Param('user_id')
    user_id: string,
  ) {
    return this.authService.changePassword(user_id);
  }

  @Post('login')
  loginUser(@Body() payload: LoginUserDTO) {
    return this.authService.loginUser(payload);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  getProfile(@GetUser('user_id') user_id: string) {
    return this.authService.getUserProfile(user_id);
  }
}
