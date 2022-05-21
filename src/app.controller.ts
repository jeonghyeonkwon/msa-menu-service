import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @EventPattern('restaurant-create-restaurant-event')
  // getMessage(@Payload() messages) {
  //   console.log(JSON.stringify(messages.value, null, 2));
  //   return 'OK';
  // }
  @Get('/health-check')
  check() {
    return `healthCheck ${process.env.PORT}`;
  }
}
