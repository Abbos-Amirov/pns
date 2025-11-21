import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ViewInput } from '../../libs/dto/view/view.input';
import { View } from '../../libs/dto/view/view';
import { T } from '../../libs/types/common';
import { lookupVisit } from '../../libs/config';
import { ViewGroup } from '../../libs/enums/view.enum';
import { OrdinaryInquiry } from '../../libs/dto/products/product.input';
import { Products } from '../../libs/dto/products/product';


@Injectable()
export class ViewService {
  constructor(
    @InjectModel('View') private readonly viewModel: Model<View>,
  ) {}

  public async recordView(input: ViewInput): Promise<View | null> {
    const viewExist = await this.checkViewExistence(input);
    if (!viewExist) {
      console.log('-- New View Insert --');
      return await this.viewModel.create(input);
    } else {
      return null;
    }
  }

  private async checkViewExistence(input: ViewInput): Promise<View | null> {
    const { memberId, viewRefId } = input;
    const search: T = { memberId: memberId, viewRefId: viewRefId };
    return await this.viewModel.findOne(search).exec();
  }

  public async getVisetedProducts( memberId: ObjectId, input: OrdinaryInquiry): Promise<Products> {
    const { page, limit } = input;
    const match = { viewGroup: ViewGroup.PRODUCT, memberId: memberId };
  
    const data = await this.viewModel
      .aggregate([
        { $match: match },
        { $sort: { updatedAt: -1 } },
        {
          $lookup: {
            from: 'products',
            localField: 'viewRefId',
            foreignField: '_id',
            as: 'visitedProducts',
          },
        },
        { $unwind: '$visitedProducts' },
        {
          $facet: {
            list: [
              { $skip: (page - 1) * limit },
              { $limit: limit },
              lookupVisit,
              { $unwind: '$visitedProducts.memberData'},
              
            ],
            metaCounter: [{ $count: 'total'}],
          },
        },
       
      ])
      .exec();
  
    console.log('data:', data);
    const result: Products = {list: [], metaCounter: data[0].metaCounter }
    result.list = data[0].list.map((ele) => ele.visitedProducts);
    console.log('result:', result);

    return result;
  }

}