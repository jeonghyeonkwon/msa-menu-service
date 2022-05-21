import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Eureka } from 'eureka-js-client';
const ip = require('ip');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const client = new Eureka({
    instance: {
      app: 'menu-service',
      instanceId: `${ip.address()}:${process.env.PORT!}`,
      hostName: `${ip.address()}`,
      ipAddr: `${ip.address()}`,
      statusPageUrl: 'http://localhost:3065/check',
      port: {
        $: 3067,
        '@enabled': true,
      },
      vipAddress: 'menu-service.jeonghyeon.com',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: '127.0.0.1',
      port: 8761,
      servicePath: '/eureka/apps/',
    },
  });
  client.start((error) => {
    console.log(error || 'menu service registered');
  });
  app.listen(process.env.PORT);
  // await app.listen(process.env.PORT!);
  // const kafka = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         clientId: `menu-${process.env.PORT}`,
  //         brokers: ['localhost:9092'],
  //       },
  //       consumer: {
  //         groupId: 'menu-group',
  //       },
  //     },
  //   },
  // );
  // kafka.listen();
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: ['localhost:9092'],
  //       },
  //     },
  //   },
  // );
  // app
  //   .listen()
  //   .then(() => console.log('microservice start'))
  //   .catch((err) => console.error(err));
}

bootstrap();
