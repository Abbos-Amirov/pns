import { Field, Float, ObjectType } from '@nestjs/graphql';
import { LocationType } from '../../../libs/enums/location.enum';

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

  @Field(() => Float)
  longitude: number;

  @Field(() => [String])
  images: string[];

  @Field(() => String)
  createdBy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}