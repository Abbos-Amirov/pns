import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ObjectId } from 'mongoose';
import {
  ProductCategory,
  ProductColor,
  ProductGlassType,
  ProductLocation,
  ProductMaterial,
  ProductOpenType,
  ProductStatus,
  ProductType,
} from '../../enums/product.enum';

import { MeLiked } from '../like/like';
import { Member, TotalCounter } from '../member/member';

@ObjectType()
export class  Product {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => ProductType)
  productType: ProductType;

  @Field(() => ProductStatus)
  productStatus: ProductStatus;

  @Field(() => ProductLocation,{ nullable: true } )
  productLocation: ProductLocation;

  @Field(() => String,{ nullable: true })
  productAddress: string;

  @Field(() => Number)
 productHeight: number;

@Field(() => Number)
 productWidth: number;

  @Field(() => String)
  productTitle: string;

  @Field(() => Number)
  productPrice: number;

  @Field(() => ProductMaterial)
  productMaterial: string;


  @Field(() => ProductGlassType)
  productGlassType: string;

  @Field(() => ProductOpenType)
  productOpenType: string;


  @Field(() => ProductCategory)
  productCategory: string;

  @Field(() => ProductColor)
  productColor: string;

  @Field(() => Int,{ nullable: true })
  productItems: number;

  @Field(() => Int)
  productViews: number;

  @Field(() => Int,{ nullable: true })
  productLikes: number;

  @Field(() => Int,{ nullable: true })
  productComments: number;

  @Field(() => Int,{ nullable: true })
  productRank: number;

  @Field(() => [String],{ nullable: true })
  productImages: string[];

  @Field(() => String, { nullable: true })
  productDesc?: string;

  

  @Field(() => Boolean,{ nullable: true })
  productRent: boolean;

  @Field(() => String)
  memberId: ObjectId;

  @Field(() => Date, { nullable: true })
  soldAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Field(() => Date, { nullable: true })
  manufacturedAt?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // from Aggregation
  @Field(() => [MeLiked], { nullable: true })
  meLiked?: MeLiked[];

  @Field(() => Member, { nullable: true })
  memberData?: Member;
}

@ObjectType()
export class Products {
  @Field(() => [Product])
  list: Product[];

  @Field(() => [TotalCounter], { nullable: true })
  metaCounter: TotalCounter[];
}