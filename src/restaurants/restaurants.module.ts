import { Module } from '@nestjs/common';
import { RestaurantsService } from './service/restaurants.service';
import { RestaurantsController } from './controller/restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantRepository } from './restaurant.repository';
import { FoodsRespotiroy } from '../foods/foods.respotiroy';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantRepository, FoodsRespotiroy])],
  providers: [RestaurantsService],
  controllers: [RestaurantsController],
  exports: [
    RestaurantsService,
    TypeOrmModule.forFeature([RestaurantRepository]),
  ],
})
export class RestaurantsModule {}
