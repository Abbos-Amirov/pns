import { Module } from '@nestjs/common';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { LikeModule } from '../like/like.module';
import { MemberModule } from '../member/member.module';
import LocationSchema from '../../schemas/Location.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'Location', schema: LocationSchema}]),MemberModule, AuthModule,ViewModule,LikeModule],
  providers: [LocationResolver, LocationService]
})
export class LocationModule {}
