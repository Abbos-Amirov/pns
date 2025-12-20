import { Field, Float, ObjectType } from '@nestjs/graphql';
import { LocationCity, LocationType } from '../../../libs/enums/location.enum';
import { MeLiked } from '../like/like';
import { Member, TotalCounter } from '../member/member';
import type { ObjectId } from 'mongoose';

@ObjectType()
export class Location {
  @Field(() => String)
  _id: string;

  @Field()
  locationName: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => LocationType)
  locationType: LocationType;

  @Field(() => Float)
  latitude: number;

  @Field(() => LocationCity)
  locationCity: LocationCity

  @Field(() => Float)
  longitude: number;
  @Field(() => Number,{nullable: true})
  locationViews: number;
  
  @Field(() => Number, {nullable: true})
  locationLikes: number;

  @Field(() => [String])
  images: string[];

  @Field(() => String)
  memberId: ObjectId;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [MeLiked], )
  meLiked?: MeLiked[];

  @Field(() => Member, { nullable: true })
  memberData?: Member;

}

@ObjectType()
export class Locations {
  @Field(() => [Location])
  list: Location[];

  @Field(() => [TotalCounter], { nullable: true })
  metaCounter: TotalCounter[];
}