import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
} from 'class-validator';
import { ProductCategory, ProductGlassType, ProductLocation, ProductMaterial, ProductOpenType, ProductStatus, ProductType } from '../../enums/product.enum';
import type { ObjectId } from 'mongoose';

@InputType()
export class ProductUpdate {
  @IsNotEmpty()
  @Field(() => String)
  _id: string;

  @IsOptional()
  @Field(() => ProductType, { nullable: true })
  productType?: ProductType;

  @IsOptional()
  @Field(() => ProductStatus, { nullable: true })
  productStatus?: ProductStatus;

  @IsOptional()
  @Field(() => ProductLocation, { nullable: true })
  productLocation?: ProductLocation;

  @IsOptional()
  @Field(() => Number, { nullable: true })
  productHeight?: number;

  @IsOptional()
  @Field(() => Number, { nullable: true })
  productWidth?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  productAddress?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  productTitle?: string;

  @IsOptional()
  @Field(() => Number, { nullable: true })
  productPrice?: number;

  // 🟢 NEW — Product Material
  @IsOptional()
  @Field(() => ProductMaterial, { nullable: true })
  productMaterial?: ProductMaterial;

  // 🟢 NEW — Glass Type
  @IsOptional()
  @Field(() => ProductGlassType, { nullable: true })
  productGlassType?: ProductGlassType;

  // 🟢 NEW — Open Type
  @IsOptional()
  @Field(() => ProductOpenType, { nullable: true })
  productOpenType?: ProductOpenType;

  // 🟢 NEW — Category
  @IsOptional()
  @Field(() => ProductCategory, { nullable: true })
  productCategory?: ProductCategory;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Field(() => Int, { nullable: true })
  productItems?: number;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  productImages?: string[];

  @IsOptional()
  @Field(() => String, { nullable: true })
  productDesc?: string;

  // 🟢 NEW — RENT YES/NO
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  productRent?: boolean;

  // 🟢 NEW — BARTER OPTION
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  productBarter?: boolean;

  @Field(() => Date, { nullable: true })
  manufacturedAt?: Date;

  @Field(() => Date, { nullable: true })
  soldAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}