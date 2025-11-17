import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
} from 'class-validator';
import { ProductLocation, ProductStatus, ProductType } from '../../enums/product.enum';
import type { ObjectId } from 'mongoose';

@InputType()
export class ProductUpdate {
  //  Product ID — bu yangilanadigan mahsulotning unikal ID-si
  @IsNotEmpty()
  @Field(() => String)
  _id: ObjectId;

  // Product turi (Electronics, Furniture, Food va h.k.)
  @IsOptional()
  @Field(() => ProductType, { nullable: true })
  productType?: ProductType;

  //  Product holati (Active, Sold, Deleted)
  @IsOptional()
  @Field(() => ProductStatus, { nullable: true })
  productStatus?: ProductStatus;

  //  Mahsulot joylashuvi (BUSAN, SEOUL, va h.k.)
  @IsOptional()
  @Field(() => ProductLocation, { nullable: true })
  productLocation?: ProductLocation;


  @IsOptional()
@Field(() => Number,{ nullable: true })
productHeight?: number;

@IsOptional()
@Field(() => Number,{ nullable: true })
productWidth?: number;

  // To‘liq manzil
  @IsOptional()
  @Length(3, 100)
  @Field(() => String, { nullable: true })
  productAddress?: string;

  //  Mahsulot sarlavhasi
  @IsOptional()
  @Length(3, 100)
  @Field(() => String, { nullable: true })
  productTitle?: string;

  //  Narxi
  @IsOptional()
  @Field(() => Number, { nullable: true })
  productPrice?: number;

  //  O‘lchami (kv. metr yoki hajm)
  @IsOptional()
  @Field(() => Number, { nullable: true })
  productSquare?: number;

  //  Variantlar yoki miqdorlar soni
  @IsOptional()
  @IsInt()
  @Min(1)
  @Field(() => Int, { nullable: true })
  productQuantity?: number;

  //  Paketdagi mahsulotlar soni
  @IsOptional()
  @IsInt()
  @Min(1)
  @Field(() => Int, { nullable: true })
  productItems?: number;

  // Rasm fayllar
  @IsOptional()
  @Field(() => [String], { nullable: true })
  productImages?: string[];

  //  Qo‘shimcha tavsif
  @IsOptional()
  @Length(5, 500)
  @Field(() => String, { nullable: true })
  productDesc?: string;

  // Barter holati (true/false)
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  productBarter?: boolean;

  //  Ijaraga beriladimi (true/false)
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  productRent?: boolean;

  // Sotilgan sana
  soldAt?: Date;

  // O‘chirilgan sana
  deletedAt?: Date;

  // Ishlab chiqarilgan sana
  @IsOptional()
  @Field(() => Date, { nullable: true })
  manufacturedAt?: Date;
}