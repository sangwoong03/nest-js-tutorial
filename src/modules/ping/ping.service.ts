import { Injectable } from '@nestjs/common';
import Ping from './entity/ping.entity';

@Injectable()
export class PingService {
  private ping: Ping = new Ping();

  pong(): Ping {
    this.ping.message = "pong"
    return this.ping
  }
}
