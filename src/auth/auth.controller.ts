import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService ) { }

  @Post('singup')
  async signup(@Body() body: SignUpInputDto): Promise<SignUpOutputDto> {
    return this.authService.signup(body)
  }
}
