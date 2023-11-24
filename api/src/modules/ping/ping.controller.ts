import { Controller, Get, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { PingService } from './ping.service';
import Ping from './entity/ping.entity';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('ping')
export class PingController {
  constructor( private readonly pingService: PingService ) { }

  @Get()
  // test guards
  // @UseGuards(AuthGuard)
  getPing(): Ping {
    return this.pingService.pong()
  }
}
