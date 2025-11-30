import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { Model, ObjectId } from 'mongoose';
import { Notice } from '../../libs/dto/cs/notice.output';
import { CreateNoticeInput, UpdateNoticeInput } from '../../libs/dto/cs/notice.input';
import { NoticeStatus } from '../../libs/enums/notice.enum';
import moment from 'moment';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class CsService {
    constructor (@InjectModel('Notice') private readonly noticeModel: Model<Notice>,
    private authService: AuthService,) {}

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
    
    
}
