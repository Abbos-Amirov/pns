import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberType } from '../../libs/enums/member.enum';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import {  ProductInput, ProductsInquiry } from '../../libs/dto/products/product.input';
import { Product, Products } from '../../libs/dto/products/product';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { ProductUpdate } from '../../libs/dto/products/product.update';
import { AuthGuard } from '../auth/guards/auth.guard';


@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService){}


   // >>>>>>>>>>>>>>>>>>>  GET PROPERTY <<<<<<<<<<<<<<<<

   @UseGuards(WithoutGuard)
   @Query( (returns)  =>  Product)
   public async getProduct(@Args('ProductId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Product> {
        console.log("Query: getProperty");
        const propertyId = shapeIntoMongoObjectId(input);
        return await this.productService.getProduct( memberId, propertyId)
        
   }



@UseGuards(WithoutGuard)
@Query(() => Products)
public async getProducts(
  @Args('input') input: ProductsInquiry,
  @AuthMember('_id') memberId: ObjectId,
): Promise<Products> {
  console.log('Query: getProperties');

  // Service qatlamiga so‘rovni yuboramiz
  return await this.productService.getProducts(memberId, input);
}


@UseGuards(AuthGuard)
 @Mutation(() => Product)
 public async likeTargetProduct(
   @Args('memberId') input: string,
   @AuthMember('_id') memberId: ObjectId,
 ): Promise<Product> {
   console.log('Mutation: likeTargetProduct');
 
   const likeRefId = shapeIntoMongoObjectId(input);
 
   return await this.productService.likeTargetProduct(memberId, likeRefId);
 }

// ADMIN //


@Roles(MemberType.ADMIN)
@UseGuards(RolesGuard)
@Mutation(() => Product)
public async createProduct(
  @Args('input') input: ProductInput,
  @AuthMember('_id') memberId: ObjectId,
): Promise<Product> {
  console.log('Mutation: createProperty');
  input.memberId = memberId
  return await this.productService.createProduct(input);
}


@Roles(MemberType.ADMIN)
@UseGuards(RolesGuard)
@Mutation(() => Product)
public async updateProduct(
  @Args('input') input: ProductUpdate,
  @AuthMember('_id') memberId: ObjectId,
): Promise<Product> {
  console.log('Mutation: updateProperty');

  // _id ni MongoDB ObjectId formatiga o'tkazamiz
  input._id = shapeIntoMongoObjectId(input._id);
  return await this.productService.updateProduct(memberId, input);
}

@Roles(MemberType.ADMIN)
@UseGuards(RolesGuard)
@Mutation(() => Product)
public async updateProductByAdmin(
  @Args('input') input: ProductUpdate,
): Promise<Product> {
  console.log('Mutation: updateProductByAdmin');
  input._id = shapeIntoMongoObjectId(input._id);
  return await this.productService.updateProductByAdmin(input);
}

@Roles(MemberType.ADMIN)
@UseGuards(RolesGuard)
@Mutation(() => Product)
public async removeProductByAdmin(
  @Args('productId') input: string,
): Promise<Product> {
  console.log('Mutation: removeProductByAdmin');
  const productId = shapeIntoMongoObjectId(input);
  return await this.productService.removeProductByAdmin(productId);
}


}
