import { Module } from '@nestjs/common';
import { CsResolver } from './cs.resolver';
import { CsService } from './cs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import NoticeSchema from '../../schemas/Notice.model';

@Module({

  imports: [MongooseModule.forFeature([{name:'Notice', schema: NoticeSchema ,}]),
  AuthModule],
  providers: [CsResolver, CsService]
})
export class CsModule {}
