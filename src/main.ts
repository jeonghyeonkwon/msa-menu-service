import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Eureka } from 'eureka-js-client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ip = require('ip');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const client = new Eureka({
    instance: {
      app: 'menu-service',
      instanceId: `${ip.address()}:${process.env.PORT!}`,
      hostName: `${ip.address()}`,
      ipAddr: `${ip.address()}`,
      statusPageUrl: `http://localhost:${process.env.PORT!}/check`,
      port: {
        $: parseInt(process.env.PORT!),
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
}

bootstrap();
