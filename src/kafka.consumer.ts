import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';
import { RestaurantsService } from './restaurants/service/restaurants.service';
import { FoodsService } from './foods/service/foods.service';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly restaurantService: RestaurantsService,
    private readonly foodsService: FoodsService,
  ) {}
  async onModuleInit() {
    await this.consumerService.consume(
      {
        topics: [
          'restaurant-create-food-event',
          'restaurant-create-restaurant-event',
        ],
        fromBeginning: false,
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          switch (topic) {
            case 'restaurant-create-restaurant-event':
              console.log({
                value: JSON.parse(message.value!.toString()),
              });
              await this.restaurantService.createRestaurant(
                JSON.parse(message.value!.toString()),
              );

              break;
            case 'restaurant-create-food-event':
              console.log({
                value: JSON.parse(message.value!.toString()),
                // topic: topic.toString(),
                // partition: partition.toString(),
              });
              await this.foodsService.createFood(
                JSON.parse(message.value!.toString()),
              );
          }
        },
      },
    );
  }
}
