import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsController } from './controllers/foods.controller';
import { FoodsService } from './service/foods.service';
import { FoodsRespotiroy } from './foods.respotiroy';
import { RestaurantRepository } from '../restaurants/restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FoodsRespotiroy, RestaurantRepository])],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService, TypeOrmModule.forFeature([FoodsRespotiroy])],
})
export class FoodsModule {}
