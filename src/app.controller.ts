import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/menu-service')
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
