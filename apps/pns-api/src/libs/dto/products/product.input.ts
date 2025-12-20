import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { ProductCategory, ProductLocation, ProductMaterial, ProductStatus, ProductType } from '../../enums/product.enum';
import type { ObjectId } from 'mongoose';
import { Direction } from '../../enums/common.enum';
import { availableOptions, availableProductSorts } from '../../config';

@InputType()
export class ProductInput {
  @IsNotEmpty()
  @Field(() => ProductType)
  productType: ProductType;

  @IsNotEmpty()
  @Field(() => ProductStatus)
  productStatus:string;

  @IsNotEmpty()
@Field(() => Number)
productHeight: number;

@IsNotEmpty()
@Field(() => Number)
productWidth: number;

  @IsNotEmpty()
  @Field(() => ProductLocation)
  productLocation: ProductLocation;

  @IsNotEmpty()
  @Length(3, 100)
  @Field(() => String)
  productAddress: string;

  @IsNotEmpty()
  @Length(3, 100)
  @Field(() => String)
  productTitle: string;

  @IsNotEmpty()
  @Field(() => Number)
  productPrice: number;


  @IsNotEmpty()
  @Field(() => String)
  productGlassType: string;

  @IsNotEmpty()
  @Field(() => String)
  productOpenType: string;

  @IsNotEmpty()
  @Field(() => String)
  productCategory: string;


  @IsNotEmpty()
  @Field(() => String)
  productColor:string;


  


  @IsNotEmpty()
  @Field(() => String)
  productMaterial: string


  @IsNotEmpty()
  @Field(() => [String])
  productImages: string[];

  @IsOptional()
  @Length(5, 500)
  @Field(() => String, { nullable: true })
  productDesc?: string;

  

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  productRent?: boolean;

  
  memberId?: ObjectId;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  manufacturedAt?: Date; // oldingi constructedAt
}

@InputType()
export class PricesRangeInput {
  @Field(() => Int)
  start: number;

  @Field(() => Int)
  end: number;
}

@InputType()
export class WidthRange {
  @Field(() => Int)
  start: number;

  @Field(() => Int)
  end: number;
}

@InputType()
export class HeightRange {
  @Field(() => Int)
  start: number;

  @Field(() => Int)
  end: number;
}

@InputType()
export class PeriodsRangeInput {
  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}

@InputType()
class PISearch {
  @IsOptional()
  @Field(() => String, { nullable: true })
  memberId?: ObjectId;

  @IsOptional()
  @Field(() => [ProductLocation], { nullable: true })
  locationList?: ProductLocation[];

  @IsOptional()
  @Field(() => ProductCategory, { nullable: true })
  productCategory?: ProductCategory;

  @IsOptional()
  @Field(() => [ProductType], { nullable: true })
  typeList?: ProductType[];

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  roomsList?: number[];

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  bedsList?: number[];
  

  @IsOptional()
  @Field(() => ProductStatus, { nullable: true })
  productStatus?: ProductStatus;


  @IsOptional()
  @IsIn(availableOptions, { each: true })
  @Field(() => [String], { nullable: true })
  options?: string[];

  @IsOptional()
  @Field(() => PricesRangeInput, { nullable: true })
  pricesRange?: PricesRangeInput;

  @IsOptional()
  @Field(() =>  PeriodsRangeInput, { nullable: true })
  periodsRange?:  PeriodsRangeInput;

  @IsOptional()
  @Field(() =>HeightRange , { nullable: true })
  heightRange ?: HeightRange ;


  @IsOptional()
  @Field(() => ProductMaterial, { nullable: true })
  productMaterial?: ProductMaterial;



  @IsOptional()
  @Field(() => WidthRange, { nullable: true })
  widthRange?: WidthRange;

  @IsOptional()
  @Field(() => String, { nullable: true })
  text?: string;
}

@InputType()
export class ProductsInquiry {
  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  page: number;

  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  limit: number;

  @IsOptional()
  @IsIn(availableProductSorts)
  @Field(() => String, { nullable: true })
  sort?: string;

  @IsOptional()
  @Field(() => ProductMaterial, { nullable: true })
  productMaterial?: ProductMaterial;

  @IsOptional()
  @Field(() => Direction, { nullable: true })
  direction?: Direction;

  @IsNotEmpty()
  @Field(() => PISearch)
  search: PISearch;
}

@InputType()
class APISearch {
  @IsOptional()
  @Field(() => ProductStatus, { nullable: true })
  productStatus?: ProductStatus;
}

@InputType()
export class AgentProductsInquiry {
  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  page: number;

  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  limit: number;

  @IsOptional()
  @IsIn(availableProductSorts)
  @Field(() => String, { nullable: true })
  sort?: string;

  @IsOptional()
  @Field(() => Direction, { nullable: true })
  direction?: Direction;

  @IsNotEmpty()
  @Field(() => APISearch)
  search: APISearch;
}
@InputType()
export class OrdinaryInquiry {
  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  page: number;

  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  limit: number;
}