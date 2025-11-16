import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Inject, Injectable, InternalServerErrorException, forwardRef } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import  moment from 'moment' 

import { ProductInput } from '../../libs/dto/products/product.input';
import { Message } from '../../libs/enums/common.enum';
import { Product } from '../../libs/dto/products/product';
import { ViewService } from '../view/view.service';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ProductStatus } from '../../libs/enums/product.enum';
import { ProductUpdate } from '../../libs/dto/products/product.update';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')  // yoki 'Product' bo‘lsa, shunga mos
    private readonly productModel: Model<Product>,

    // Agar circular dependency bo‘lmasa:
    private readonly memberService: MemberService,
    private viewService: ViewService,

    // Agar circular dependency bo‘lsa, unda bunday:
    // @Inject(forwardRef(() => MemberService))
    // private readonly memberService: MemberService,
  ) {}

  public async createProduct(input: ProductInput): Promise<Product> {
    try {
      const result = await this.productModel.create(input);
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

    // >>>>>>>>>>>>>>>>>>>  GET PROPERTY <<<<<<<<<<<<<<<<

    public async getProduct(memberId: ObjectId, productId: ObjectId): Promise<Product> {
        const search: T = {
          _id: productId,
          productStatus: ProductStatus.ACTIVE,
        };

        console.log("qidirib top", search);
        
      
        //  Maqsadli property’ni topamiz
        const targetProduct: Product | null = await this.productModel.findOne(search).lean().exec();
        if (!targetProduct) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

       
        
      
        // Agar foydalanuvchi mavjud bo‘lsa (ya’ni memberId berilgan bo‘lsa)
        if (memberId) {
          const viewInput = {
            memberId: memberId,
            viewRefId: productId,
            viewGroup: ViewGroup.PRODUCT,
          };
      
          // 🔹 View yozuvini saqlaymiz (agar bu foydalanuvchi ilgari ko‘rmagan bo‘lsa)
          const newView = await this.viewService.recordView(viewInput);
          if (newView) {
            await this.propertyStatsEditor({
              _id: productId,
              targetKey: 'propertyViews',
              modifier: 1,
            });
            targetProduct.productViews++;
          }
      
          // //  Meliked (ya’ni yoqtirganmi) qismi keyin yoziladi
          // // meliked
        }
      
        //  Member haqidagi ma’lumotni ham qo‘shamiz
        targetProduct.memberData = await this.memberService.getMember(null, targetProduct.memberId);
        
      
        return targetProduct;
      }
      
      // 🧩 Statistikani yangilovchi yordamchi funksiya
      public async propertyStatsEditor(input: StatisticModifier): Promise<Product | null> {
        const { _id, targetKey, modifier } = input;
        
      
        return await this.productModel
          .findByIdAndUpdate(
            _id,
            { $inc: { [targetKey]: modifier } },
            { new: true },
          ).exec();
      }


      public async updateProduct(memberId: ObjectId, input: ProductUpdate): Promise<Product> {
        let { productStatus, soldAt, deletedAt } = input;
      
        //  1. Qaysi property yangilanayotganini aniqlaymiz
        const search = {
          _id: input._id,
          memberId: memberId,
          productStatus: ProductStatus.ACTIVE,
        };
      
        //  2. Agar status SOLD yoki DELETE bo‘lsa, vaqtni qo‘shamiz
        if (productStatus === ProductStatus.OUT_OF_STOCK) soldAt = moment().toDate();
        else if (productStatus === ProductStatus.DELETE) deletedAt = moment().toDate();
      
        //  3. Yangilash amali
        const result = await this.productModel
          .findOneAndUpdate(search, input, { new: true })
          .exec();
      
        //  4. Agar yangilanmasa — xatolik
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
      
        // 5. Agar property sotilgan yoki o‘chirilgan bo‘lsa — member statistikasi kamayadi
        if (soldAt || deletedAt) {
          await this.memberService.memberStatsEditor({
            _id: memberId,
            targetKey: 'memberProperties',
            modifier: -1,
          });
        }
      
        //  6. Yangilangan propertyni qaytaramiz
        return result;
      }
}