import { RestaurantsService } from '../service/restaurants.service';
import { IRestaurant } from '../dto/restaurant.kafka';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RestaurantSearchOption } from '../dto/restaurant.search';
import { FoodSearchOption } from '../../foods/dto/food.search';

@Controller('/menu-service/restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Get('/')
  findRestaurantList(
    @Query('pageNo', ParseIntPipe) pageNo: number,
    @Query('restaurantName') restaurantName: string,
  ) {
    const option = RestaurantSearchOption.create(restaurantName, pageNo, 10);

    return this.restaurantService.findList(option);
  }
  @Get('/:restaurantId')
  findRestaurantFoodList(
    @Param('restaurantId') restaurantId: string,
    @Query('pageNo', ParseIntPipe) pageNo: number,
  ) {
    const option = FoodSearchOption.create(pageNo, 10);
    return this.restaurantService.findFoodList(restaurantId, option);
  }
}
