import { Module } from '@nestjs/common';
import { BoardArticleService } from './board-article.service';
import { BoardArticleResolver } from './board-article.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { ViewModule } from '../view/view.module';
import BoardArticleSchema from '../../schemas/BoardArticle.model';

@Module({

  imports: [MongooseModule.forFeature([{name:'BoardArticle', schema: BoardArticleSchema}]),
  AuthModule,
  MemberModule,
  ViewModule,
],
  providers: [BoardArticleService, BoardArticleResolver]
})
export class BoardArticleModule {}
