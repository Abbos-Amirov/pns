import { InputType, Field, Float } from '@nestjs/graphql';
import { LocationType } from '../../enums/location.enum';

@InputType()
export class LocationUpdateInput {
  @Field(() => String)
  _id: string;

  @Field({ nullable: true })
  locationName?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => LocationType, { nullable: true })
  locationType?: LocationType;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;
}