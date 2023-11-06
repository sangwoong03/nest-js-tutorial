import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches
} from 'class-validator';

export class SignInInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_+=-])[A-Za-z\d~!@#$%^&*_+=-]{8,}$/)
  password: string;
}

export class SignInOutputDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;
}