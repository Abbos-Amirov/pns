import { NestFactory } from '@nestjs/core';
import { PnsBatchModule } from './pns-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(PnsBatchModule);
  await app.listen(process.env.PORT_BATCH ?? 3000);
}
bootstrap();
