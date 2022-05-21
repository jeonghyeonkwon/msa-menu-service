import { Controller, Get, Post } from '@nestjs/common';
import { RestaurantsService } from '../service/restaurants.service';
import { IRestaurant } from '../dto/restaurant.kafka';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}
  // @Post('create')
  // createRestaurant() {
  //   this.restaurantService.createRestaurant({
  //     id: 123,
  //     restaurantId: '아이디',
  //     restaurantName: '이름',
  //     owner_pk: 'PK',
  //   });
  // }
}
