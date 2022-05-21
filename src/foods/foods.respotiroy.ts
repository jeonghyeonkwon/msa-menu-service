import { EntityRepository, Repository } from 'typeorm';
import { Foods } from './foods.entity';
import { IFood } from './dto/food.kafka';
import { Restaurant } from '../restaurants/restaurant.entity';

@EntityRepository(Foods)
export class FoodsRespotiroy extends Repository<Foods> {
  async createFood(dto: IFood, restaurant: Restaurant): Promise<Foods> {
    const { foodId } = dto;
    const isExistFood = await this.findOne({ where: { foodId } });
    if (!isExistFood) {
      const food = new Foods();
      food.foodId = dto.foodId;
      food.foodPrice = dto.foodPrice;
      food.foodName = dto.foodName;
      food.restaurant = restaurant;
      const createdFood = await this.save(food);
      return createdFood;
    } else {
      return isExistFood;
    }
  }
}
