import { Module } from '@nestjs/common';
import { PnsBatchController } from './pns-batch.controller';
import { PnsBatchService } from './pns-batch.service';
import{ConfigModule} from "@nestjs/config"
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [PnsBatchController],
  providers: [PnsBatchService],
})
export class PnsBatchModule {}
