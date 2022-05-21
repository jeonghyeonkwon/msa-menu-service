import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from './restaurants/restaurants.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsService } from './restaurants/service/restaurants.service';
import { getConnectionOptions } from 'typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerService } from './kafka/consumer.service';
import { KafkaConsumer } from './kafka.consumer';
import { RestaurantRepository } from './restaurants/restaurant.repository';
import { FoodsModule } from './foods/foods.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    KafkaModule,
    // ClientsModule.register([
    //   {
    //     name: 'KAFKA-SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: `menu-service ${process.env.PORT}`,
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'menu-consumer',
    //       },
    //     },
    //   },
    // ]),

    RestaurantsModule,
    FoodsModule,
    // TypeOrmModule.forFeature([RestaurantRepository]),
  ],
  controllers: [AppController],
  providers: [AppService, KafkaConsumer],
})
export class AppModule {}
