import { Controller, Get, Delete, Patch, Post } from '@nestjs/common';
import { PingService } from './ping.service';
import Ping from './ping.entity';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) { }

  @Get()
  getPing(): Ping {
    return this.pingService.pong()
  }
}
