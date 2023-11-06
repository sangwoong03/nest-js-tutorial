import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';
import { SignInInputDto, SignInOutputDto } from './dto/signin.dto';
import { ResonponseFormatInterceptor } from 'src/common/interceptor/response-format.interceptor';

@Controller('auth')
@UseInterceptors(ResonponseFormatInterceptor)
export class AuthController {
  constructor( private readonly authService: AuthService ) { }

  @Post('signup')
  async signup(@Body() body: SignUpInputDto): Promise<SignUpOutputDto> {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInInputDto): Promise<SignInOutputDto> {
    return this.authService.signin(body);
  }
}
