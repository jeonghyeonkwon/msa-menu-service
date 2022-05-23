import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { IRestaurant } from './dto/restaurant.kafka';
import { Foods } from '../foods/foods.entity';
import { RestaurantSearchOption } from './dto/restaurant.search';

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

  findListOption(option: RestaurantSearchOption) {
    const queryBuilder = createQueryBuilder()
      .select(['restaurant.restaurantId', 'restaurant.restaurantName'])
      .from(Restaurant, 'restaurant')
      .limit(option.getLimit())
      .offset(option.getOffset());
    if (option.hasRestaurantName()) {
      queryBuilder.andWhere(
        'restaurant.restaurantName ilike : restaurantName',
        { restaurantName: `%${option.restaurantName}%` },
      );
    }

    return queryBuilder.disableEscaping().getManyAndCount();
  }
}
