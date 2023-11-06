import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';
import { ResonponseFormatInterceptor } from 'src/common/interceptor/response-format.interceptor';

@Controller('auth')
@UseInterceptors(ResonponseFormatInterceptor)
export class AuthController {
  constructor( private readonly authService: AuthService ) { }

  @Post('signup')
  async signup(@Body() body: SignUpInputDto): Promise<SignUpOutputDto> {
    console.log(body)
    return this.authService.signup(body);
  }
}
