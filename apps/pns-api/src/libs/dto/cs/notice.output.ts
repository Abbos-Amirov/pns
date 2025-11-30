import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NoticeCategory, NoticeCategoryType, NoticeStatus } from '../../enums/notice.enum';


@ObjectType()
export class Notice {
  @Field(() => ID)
  _id: string;

  @Field(() => NoticeCategory,{ nullable: true })
  noticeCategory: NoticeCategory;


  @Field(() => NoticeCategoryType,{ nullable: true })
  noticeCategoryType: NoticeCategoryType;

  @Field(() => NoticeStatus,{ nullable: true })
  noticeStatus: NoticeStatus;

  @Field()
  noticeTitle: string;

  @Field()
  noticeContent: string;

  @Field()
  memberId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}