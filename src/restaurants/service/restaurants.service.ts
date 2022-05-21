import { Injectable } from '@nestjs/common';
import { IRestaurant } from '../dto/restaurant.kafka';
import { RestaurantRepository } from '../restaurant.repository';

@Injectable()
export class RestaurantsService {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async createRestaurant(restaurant: IRestaurant) {
    await this.restaurantRepository.createRestaurant(restaurant);
  }
}
