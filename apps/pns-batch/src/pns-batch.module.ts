import { Module } from '@nestjs/common';
import { PnsBatchController } from './pns-batch.controller';
import { PnsBatchService } from './pns-batch.service';
import{ConfigModule} from "@nestjs/config"
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule,ScheduleModule.forRoot()],
  controllers: [PnsBatchController],
  providers: [PnsBatchService],
})
export class PnsBatchModule {}
