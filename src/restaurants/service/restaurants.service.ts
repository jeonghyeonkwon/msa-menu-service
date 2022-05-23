import { Injectable } from '@nestjs/common';
import { IRestaurant } from '../dto/restaurant.kafka';
import { RestaurantRepository } from '../restaurant.repository';
import { RestaurantSearchOption } from '../dto/restaurant.search';
import { PagenationDto } from '../../commons/pagenation.dto';
import { RestaurantResponseDto } from '../dto/restaurant.response';
import { FoodSearchOption } from '../../foods/dto/food.search';
import { FoodsRespotiroy } from '../../foods/foods.respotiroy';
import { FoodResponseDto } from '../../foods/dto/food.response';

@Injectable()
export class RestaurantsService {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private foodRepository: FoodsRespotiroy,
  ) {}

  async createRestaurant(restaurant: IRestaurant) {
    await this.restaurantRepository.createRestaurant(restaurant);
  }

  async findList(option: RestaurantSearchOption) {
    const result = await this.restaurantRepository.findListOption(option);
    return new PagenationDto<RestaurantResponseDto>(
      result[1],
      option.pageSize,
      option.pageNo,
      result[0].map((data) => new RestaurantResponseDto(data)),
    );
  }

  async findFoodList(restaurantId: string, option: FoodSearchOption) {
    const result = await this.foodRepository.findListOption(
      restaurantId,
      option,
    );
    return new PagenationDto<FoodResponseDto>(
      result[1],
      option.pageSize,
      option.pageNo,
      result[0].map((data) => new FoodResponseDto(data)),
    );
  }
}
