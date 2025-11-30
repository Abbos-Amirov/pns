import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { LocationType } from '../../../libs/enums/location.enum';
import { GraphQLUpload } from 'graphql-upload';
import type { FileUpload } from 'graphql-upload';
import type { ObjectId } from 'mongoose';
import { IsIn, IsNotEmpty, IsOptional, Min, } from 'class-validator';
import { availableLocationSorts } from '../../config';
import { Direction } from '../../enums/common.enum';

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

  memberId: ObjectId;
}

@InputType()
export class LocationFilterInput {
  @Field({ nullable: true })
  keyword?: string; // nom yoki manzil bo‘yicha qidirish

  @Field(() => LocationType, { nullable: true })
  locationType?: LocationType;
}

@InputType()
class LISearch {
  @IsOptional()
  @Field(() => String, { nullable: true })
  memberId?: ObjectId;   // qaysi "razmer oluvchi" yaratgan joylar

  @IsOptional()
  @Field(() => [LocationType], { nullable: true })
  typeList?: LocationType[];   // locationType bo‘yicha filter

  @IsOptional()
  @Field(() => String, { nullable: true })
  text?: string;               // locationName yoki address bo‘yicha izlash

  @IsOptional()
  @Field(() => Float, { nullable: true })
  minLatitude?: number;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  maxLatitude?: number;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  minLongitude?: number;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  maxLongitude?: number;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  radius?: number;             // radius bo‘yicha qidiruv (optional)

  @IsOptional()
  @Field(() => Float, { nullable: true })
  baseLatitude?: number;       // radius markaz

  @IsOptional()
  @Field(() => Float, { nullable: true })
  baseLongitude?: number;      // radius markaz
}


@InputType()
export class LocationsInquiry {
  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  page: number;

  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  limit: number;

  @IsOptional()
  @IsIn(availableLocationSorts)
  @Field(() => String, { nullable: true })
  sort?: string;

  @IsOptional()
  @Field(() => Direction, { nullable: true })
  direction?: Direction;

  @IsNotEmpty()
  @Field(() => LISearch)
  search: LISearch;
}

@InputType()
export class CityInquiry {
  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  page: number;

  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  limit: number;
}
