import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { IRestaurant } from './dto/restaurant.kafka';
import { Foods } from '../foods/foods.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  async createRestaurant(dto: IRestaurant): Promise<Restaurant> {
    const restaurantId = dto.restaurantId;
    const isExistRestaurant = await this.findOne({ where: { restaurantId } });
    if (!isExistRestaurant) {
      const restaurant = new Restaurant();
      restaurant.restaurantId = dto.restaurantId;
      restaurant.restaurantName = dto.restaurantName;
      restaurant.ownerId = dto.owner_pk;
      const createEntity = await this.save(restaurant);
      return createEntity;
    } else {
      return isExistRestaurant;
    }
  }

  async findByRestaurantId(restaurantId: string): Promise<Restaurant> {
    const restaurant = await this.findOne({ where: { restaurantId } });
    return restaurant;
  }

  async addEntityFoods(requestRestaurantId: string, food: Foods) {
    const restaurant = await this.findOne({
      where: { restaurantId: requestRestaurantId },
    });
    restaurant.foods.push(food);
    await this.save(restaurant);
  }
}
