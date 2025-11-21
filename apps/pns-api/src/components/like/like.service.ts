import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Like, MeLiked } from '../../libs/dto/like/like';
import { LikeInput } from '../../libs/dto/like/like.input';
import { Message } from '../../libs/enums/common.enum';
import { lookupFavorite } from '../../libs/config';
import { Product, Products } from '../../libs/dto/products/product';
import { OrdinaryInquiry } from '../../libs/dto/products/product.input';
import { LikeGroup } from '../../libs/enums/like.enum';

@Injectable()
export class LikeService {

    constructor(@InjectModel('Like') private readonly likeModel: Model<Like>) {}

  public async toggleLike(input: LikeInput): Promise<number> {
    const search = { memberId: input.memberId, likeRefId: input.likeRefId };

    const exist = await this.likeModel.findOne(search).exec();
    let   modifier = 1;

    if (exist) {
      await this.likeModel.findOneAndDelete(search).exec();
      modifier = -1;
    } else {
      try {
        await this.likeModel.create(input);
      } catch (err) {
        console.log('Error, Service.model:', err.message);
        throw new BadRequestException(Message.CREATE_FAILED);
      }
    }

    console.log( `- Like modifier ${modifier}`);
    return modifier;
  }

  public async checkLikeExistence(input: LikeInput): Promise<MeLiked[]>{
    const {memberId, likeRefId} = input;
    const result = await this.likeModel.findOne({memberId: memberId, likeRefId: likeRefId}).exec();
    return result ? [{memberId: memberId, likeRefId: likeRefId, myFavorite: true}]: [];
  }


  public async getFavoriteProduct( memberId: ObjectId, input: OrdinaryInquiry): Promise<Products> {
    const { page, limit } = input;
    console.log("page", page,limit);
    const match = { likeGroup: LikeGroup.PRODUCT, memberId: memberId };

    console.log("mache",match);
    
  
    const data = await this.likeModel
      .aggregate([
        { $match: match },
        { $sort: { updatedAt: -1 } },
        {
          $lookup: {
            from: 'products',
            localField: 'likeRefId',
            foreignField: '_id',
            as: 'favoriteProduct',
          },
        },
        { $unwind: '$favoriteProduct' },
        {
          $facet: {
            list: [
              { $skip: (page - 1) * limit },
              { $limit: limit },
              lookupFavorite,
              { $unwind: '$favoriteProduct.memberData'},
              
            ],
            metaCounter: [{ $count: 'total'}],
          },
        },
       
      ])
      .exec();
  
    console.log('data:', data);
    const result: Products = {list: [], metaCounter: data[0].metaCounter }
    result.list = data[0].list.map((ele) => ele.favoriteProduct);
    console.log('result:', result);

    return result;
  }

        
}
