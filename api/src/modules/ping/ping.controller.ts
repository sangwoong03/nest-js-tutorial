import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PingService } from './ping.service';
import Ping from './entity/ping.entity';
import { Swagger } from 'src/common/decorator/swagger.decorator';

@ApiTags("PING API")
@Controller('ping')
export class PingController {
  constructor( private readonly pingService: PingService ) { }

  @Get()
  // test guards
  // @UseGuards(AuthGuard)
  
  // test SwaggerUI
  // @Swagger()
  getPing(): Ping {
    return this.pingService.pong()
  }
}
