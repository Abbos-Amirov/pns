import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { Model } from 'mongoose';
import { Notice } from '../../libs/dto/cs/notice.output';
import { CreateNoticeInput } from '../../libs/dto/cs/notice.input';

@Injectable()
export class CsService {
    constructor (@InjectModel('Notice') private readonly noticeModel: Model<Notice>,
    private authService: AuthService,) {}

    async createNotice(input: CreateNoticeInput): Promise<Notice> {
   
        // 🧩 2. Yangi e’lonni yaratish    Bazaga saqlash
        const newNotice = await this.noticeModel.create(input);
    
      
        return newNotice
      }
    
}
