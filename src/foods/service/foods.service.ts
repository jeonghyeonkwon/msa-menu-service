import { Injectable } from '@nestjs/common';
import { FoodsRespotiroy } from '../foods.respotiroy';
import { IFood } from '../dto/food.kafka';
import { RestaurantRepository } from '../../restaurants/restaurant.repository';

@Injectable()
export class FoodsService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly foodsRepository: FoodsRespotiroy,
  ) {}

  async createFood(dto: IFood) {
    try {
      const requestRestaurantId = dto.restaurantId;
      const restaurant = await this.restaurantRepository.findByRestaurantId(
        requestRestaurantId,
      );
      const food = await this.foodsRepository.createFood(dto, restaurant);
    } catch (err) {
      console.error(err);
    }
  }
}
