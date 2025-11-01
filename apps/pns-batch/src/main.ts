import { NestFactory } from '@nestjs/core';
import { PnsBatchModule } from './pns-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(PnsBatchModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
