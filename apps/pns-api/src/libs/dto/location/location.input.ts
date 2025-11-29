import { InputType, Field, Float } from '@nestjs/graphql';
import { LocationType } from '../../../libs/enums/location.enum';
import { GraphQLUpload } from 'graphql-upload';
import type { FileUpload } from 'graphql-upload';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateLocationInput {
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

  @Field(() => [GraphQLUpload], { nullable: true })
  images?: Promise<FileUpload>[]; // Bir nechta rasm yuklash

  createdBy: ObjectId;
}

@InputType()
export class LocationFilterInput {
  @Field({ nullable: true })
  keyword?: string; // nom yoki manzil bo‘yicha qidirish

  @Field(() => LocationType, { nullable: true })
  locationType?: LocationType;
}