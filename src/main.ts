import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule
  //   ,{
  //   bufferLogs : true
  // }
  );
  // app.useLogger(app.get(MyLoggerService))
  const {httpAdapter} = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.enableCors()
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


//The app.setGlobalPrefix('api') method in a NestJS application sets a global route prefix for all routes in your application. This means every route defined in your application will automatically have the prefix /api added to it.