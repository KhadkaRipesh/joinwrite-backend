import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  user_email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
