require('dotenv');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const appOptions = { cors: true };

  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
      validationError: { value: false },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT, () =>
    console.log(`App listening on port 8080!`),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
