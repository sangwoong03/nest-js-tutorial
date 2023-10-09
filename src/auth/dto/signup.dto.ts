import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches
} from 'class-validator';

import { Gender } from '../enum/user.enum';

export class SignUpInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_+=-])[A-Za-z\d~!@#$%^&*_+=-]{8,}$/)
  password: string;
  
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  birthdate: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;
}

export interface SignUpInputField {
  name: string;
  email: string;
  hashPassword: string;
  phoneNumber?: string;
  birthdate?: string;
  gender?: Gender;
}

interface SignUpOutputField {
  name: string;
  email: string;
}

export class SignUpOutputDto {
  account: SignUpOutputField
}