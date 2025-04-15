import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'user_name', description: 'User Name here' })
  user_name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ name: 'user_email', description: 'User Email here' })
  user_email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'password', description: 'User Password here' })
  password: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'user_email', description: 'User Email here' })
  user_email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'password', description: 'User Password here' })
  password: string;
}
