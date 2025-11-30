import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
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
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class NoticeListResponse {
  @Field(() => [Notice])
  list: Notice[];

  @Field(() => Int)
  total: number;
}