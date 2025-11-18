import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { BoardArticleInput } from '../../libs/dto/board-article/board-article.input';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { InjectModel } from '@nestjs/mongoose';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class BoardArticleService {

    constructor(
        @InjectModel('BoardArticle')
        private readonly boardArticleModel: Model<BoardArticle>,
        private readonly memberService: MemberService,
        private readonly viewService: ViewService,
      ) {}

    public async createBoardArticle(
        memberId: ObjectId,
        input: BoardArticleInput,
      ): Promise<BoardArticle> {
        input.memberId = memberId
        try {
         
          const result = await this.boardArticleModel.create(input);
          
    
          // Member statistikani yangilash
          await this.memberService.memberStatsEditor({
            _id: memberId,
            targetKey: 'memberArticles',
            modifier: 1,
          });
    
          return result;
        } catch (err) {
          console.log('Error [Service.model]:', err.message);
          throw new BadRequestException(Message.CREATE_FAILED);
        }
      }
    
}
