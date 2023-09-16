import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PingController } from './ping/ping.controller';
import { PingService } from './ping/ping.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [PingController],
  providers: [PingService],
})
export class AppModule {}
