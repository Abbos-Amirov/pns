import { Module } from '@nestjs/common';
import { PnsBatchController } from './pns-batch.controller';
import { PnsBatchService } from './pns-batch.service';
import{ConfigModule} from "@nestjs/config"
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import ProductSchema from 'apps/pns-api/src/schemas/Product.model';
import MemberSchema from 'apps/pns-api/src/schemas/Member.model';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule,ScheduleModule.forRoot(),
    MongooseModule.forFeature([{name:"Product",schema:ProductSchema}]),
  MongooseModule.forFeature([{name:"Member",schema:MemberSchema}]),
  ],
  controllers: [PnsBatchController],
  providers: [PnsBatchService],
})
export class PnsBatchModule {}
