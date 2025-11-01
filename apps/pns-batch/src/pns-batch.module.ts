import { Module } from '@nestjs/common';
import { PnsBatchController } from './pns-batch.controller';
import { PnsBatchService } from './pns-batch.service';

@Module({
  imports: [],
  controllers: [PnsBatchController],
  providers: [PnsBatchService],
})
export class PnsBatchModule {}
