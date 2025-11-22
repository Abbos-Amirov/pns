import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'apps/pns-api/src/libs/dto/member/member';
import { Product } from 'apps/pns-api/src/libs/dto/products/product';
import { MemberStatus, MemberType } from 'apps/pns-api/src/libs/enums/member.enum';
import { ProductStatus } from 'apps/pns-api/src/libs/enums/product.enum';
import { Model } from 'mongoose';

@Injectable()
export class PnsBatchService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Member') private readonly memberModel: Model<Member>,
  ) {}


  public async batchRollback(): Promise<void> {
    console.log('batchRollback');

    await this.productModel
    .updateMany(
      { productStatus: ProductStatus.ACTIVE },
      { propertyRank: 0 },
    )
    .exec();

  await this.memberModel
    .updateMany(
      {
        memberStatus: MemberStatus.ACTIVE,
        memberType: MemberType.MEASURER,
      },
      { memberRank: 0 },
    )
    .exec();
  }

  public async batchTopProducts(): Promise<void> {
    const products: Product[] = await this.productModel
    .find({
      productStatus: ProductStatus.ACTIVE,
      productRank: 0,
    })
    .exec();

  const promisedList = products.map(async (ele: Product) => {
    const { _id, productLikes, productViews } = ele;
    const rank = productLikes * 2 + productViews * 1;
    return await this.productModel.findByIdAndUpdate(_id, { productRank: rank });
  });

  await Promise.all(promisedList);
  }

  public async batchTopAgents(): Promise<void> {


    const agents: Member[] = await this.memberModel
    .find({
      memberType: MemberType.MEASURER,
      memberStatus: MemberStatus.ACTIVE,
      memberRank: 0,
    })
    .exec();

  const promisedList = agents.map(async (ele: Member) => {
    const { _id, memberProducts, memberLikes, memberArticles, memberViews } = ele;
    const rank =
      memberProducts * 4 +
      memberArticles * 3 +
      memberLikes * 2 +
      memberViews * 1;

    return await this.memberModel.findByIdAndUpdate(_id, { memberRank: rank });
  });

  await Promise.all(promisedList);
  }

  
  getHello(): string {
    return 'Hello PNS - BATCH';
  }
}
