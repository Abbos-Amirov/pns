import { Module } from '@nestjs/common';
import { PnsBatchController } from './pns-batch.controller';
import { PnsBatchService } from './pns-batch.service';
import{ConfigModule} from "@nestjs/config"

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PnsBatchController],
  providers: [PnsBatchService],
})
export class PnsBatchModule {}
