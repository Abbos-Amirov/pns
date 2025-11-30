import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { FollowModule } from './follow/follow.module';
import { BoardArticleModule } from './board-article/board-article.module';
import { SocketModule } from './socket/socket.module';
import { LocationModule } from './location/location.module';
import { CsModule } from './cs/cs.module';


@Module({
  imports: [MemberModule,
     ProductModule,
     AuthModule,
     CommentModule,
     LikeModule,
     ViewModule,
     FollowModule, 
     BoardArticleModule, SocketModule, LocationModule, CsModule],
})
export class ComponentsModule {}
