import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { Model, ObjectId } from 'mongoose';
import { Notice } from '../../libs/dto/cs/notice.output';
import { CreateNoticeInput, NoticeInquiry, UpdateNoticeInput } from '../../libs/dto/cs/notice.input';
import { NoticeStatus } from '../../libs/enums/notice.enum';
import moment from 'moment';
import { Direction, Message } from '../../libs/enums/common.enum';

@Injectable()
export class CsService {
    constructor (@InjectModel('Notice') private readonly noticeModel: Model<Notice>,
    private authService: AuthService,) {}


    public async getNoticeList(input: NoticeInquiry): Promise<{ list: Notice[]; total: number }> {
        const page = input.page ?? 1;
        const limit = input.limit ?? 10;
      
        // 1️⃣ Filter
        const match: any = {
          noticeStatus: input.noticeStatus ?? NoticeStatus.ACTIVE,
        };

        console.log("Match", match);
      
        // 🟣 Category bo‘yicha filtrlash — FAQ page uchun SHART
        if (input.noticeCategoryType) {
          match.noticeCategoryType = input.noticeCategoryType;
        }
      
        // 2️⃣ Qidirish
        if (input.search) {
          match.$or = [
            { noticeTitle: { $regex: input.search, $options: 'i' } },
            { noticeContent: { $regex: input.search, $options: 'i' } },
          ];
        }
      
        // 3️⃣ Sort
        const sort: any = {
          [input.sort ?? 'createdAt']: input.direction ?? Direction.DESC,
        };

        console.log("sort",sort);
      
        // 4️⃣ Aggregation pipeline
        const result = await this.noticeModel
          .aggregate([
            { $match: match },
            { $sort: sort },
            {
              $facet: {
                list: [
                  { $skip: (page - 1) * limit },
                  { $limit: limit },
                ],
                metaCounter: [{ $count: 'total' }],
              },
            },
          ])
          .exec();

          console.log("resalt",result);
          


      
        if (!result.length)  throw new InternalServerErrorException(Message.UPDATE_FAILED || 'Notice update failed');
      
        return {
          list: result[0].list,
          total: result[0].metaCounter[0]?.total ?? 0,
        };
      }



  



    async createNotice(input: CreateNoticeInput, ): Promise<Notice> {
        // 🧩 2. Yangi e’lonni yaratish    Bazaga saqlash
        const newNotice = await this.noticeModel.create(input);
        return newNotice
      }

      // 🟣 UPDATE NOTICE – faqat admin yangilaydi
    public async updateNotice(
        input: UpdateNoticeInput,
       
      ): Promise<Notice> {
     
        // 2️⃣ Kiritilgan inputdan statuslarni olamiz
        let { noticeStatus,  } = input;
        let deletedAt: Date;
    
        // 3️⃣ Qaysi e'lon yangilanayotganini topamiz
        const search = { _id: input._id };
    
        // 4️⃣ Agar status DELETE bo‘lsa — vaqtni qo‘shamiz
        if (noticeStatus === NoticeStatus.DELETE) {
          deletedAt = moment().toDate();
          Object.assign(input, { deletedAt });
        }
    
        // 5️⃣ Yangilash amali
        const result = await this.noticeModel
          .findOneAndUpdate(search, input, { new: true })
          .exec();
    
        // 6️⃣ Agar yangilash muvaffaqiyatsiz bo‘lsa
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED || 'Notice update failed');
    
        // 7️⃣ Natijani qaytaramiz
        return result;
      }

      public async deleteNotice(id: string,): Promise<Notice> {

        const result = await this.noticeModel.findByIdAndDelete(id).exec();
        // 4️⃣ Agar yangilanish amalga oshmasa, xatolik
        if (!result) {
          throw new InternalServerErrorException('Notice delete failed');
        }
        // 5️⃣ Yangilangan (o‘chirilgan) obyektni qaytaramiz
        return result;
      }
    
    
}
