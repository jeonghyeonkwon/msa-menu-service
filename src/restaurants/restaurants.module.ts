import { Module } from '@nestjs/common';
import { RestaurantsService } from './service/restaurants.service';
import { RestaurantsController } from './controller/restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantRepository } from './restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantRepository])],
  providers: [RestaurantsService],
  controllers: [RestaurantsController],
  exports: [
    RestaurantsService,
    TypeOrmModule.forFeature([RestaurantRepository]),
  ],
})
export class RestaurantsModule {}
