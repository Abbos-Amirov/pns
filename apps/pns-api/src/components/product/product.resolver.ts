import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberType } from '../../libs/enums/member.enum';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import {  ProductInput } from '../../libs/dto/products/product.input';
import { Product } from '../../libs/dto/products/product';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';


@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService){}

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

   // >>>>>>>>>>>>>>>>>>>  GET PROPERTY <<<<<<<<<<<<<<<<

   @UseGuards(WithoutGuard)
   @Query( (returns)  =>  Product)
   public async getProduct(@Args('ProductId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Product> {
        console.log("Query: getProperty");
        const propertyId = shapeIntoMongoObjectId(input);
        return await this.productService.getProduct( memberId, propertyId)
        
   }
}
