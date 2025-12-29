import { Module } from '@nestjs/common';
import { AiResolver } from './ai.resolver';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import { Ai, AiSchema } from '../../schemas/Ai.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[ConfigModule,
    MongooseModule.forFeature([
      { name: Ai.name, schema: AiSchema },
    ]),],
  providers: [AiResolver, AiService],
  exports:[AiService]
})
export class AiModule {}
