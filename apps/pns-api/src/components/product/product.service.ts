import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { Model } from 'mongoose';
import { MemberService } from '../member/member.service';

import { ProductInput } from '../../libs/dto/products/product.input';
import { Message } from '../../libs/enums/common.enum';
import { Product } from '../../libs/dto/products/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Property')  // yoki 'Product' bo‘lsa, shunga mos
    private readonly propertyModel: Model<Product>,

    // Agar circular dependency bo‘lmasa:
    private readonly memberService: MemberService,

    // Agar circular dependency bo‘lsa, unda bunday:
    // @Inject(forwardRef(() => MemberService))
    // private readonly memberService: MemberService,
  ) {}

  public async createProduct(input: ProductInput): Promise<Product> {
    try {
      const result = await this.propertyModel.create(input);
      console.log('resalt', result);

      const natija = await this.memberService.memberStatsEditor({
        _id: result.memberId,
        targetKey: 'memberProducts',
        modifier: 1,
      });
      console.log('natija', natija);

      return result;
    } catch (err: any) {
      console.log('Error, Service.model:', err.message);
      throw new BadRequestException(Message.CREATE_FAILED);
    }
  }
}