import { InputType, Field, Int } from '@nestjs/graphql';
import { NoticeCategory,  NoticeCategoryType,  NoticeStatus } from '../../enums/notice.enum';
import { IsNotEmpty, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import type { ObjectId } from 'mongoose';
import { Direction } from '../../enums/common.enum';

@InputType()
export class CreateNoticeInput {
  @Field(() => NoticeCategory,{ nullable: true })
  noticeCategory: NoticeCategory;

  @Field(() => NoticeStatus, { nullable: true })
  noticeStatus?: NoticeStatus;

  @Field(() => NoticeCategoryType,{ nullable: true })
  noticeCategoryType: NoticeCategoryType;

  @IsOptional()
  @Field(() => String)
  noticeTitle: string;

  @IsNotEmpty()
  @Field(() => String)
  noticeContent: string;

}

@InputType()
export class UpdateNoticeInput {
  @IsNotEmpty()
  @Field(() => String)
  _id?: ObjectId;

  @Field({ nullable: true })
  noticeTitle?: string;

  @Field({ nullable: true })
  noticeContent?: string;

  @Field(() => NoticeCategoryType, { nullable: true, })
  noticeCategoryType?: NoticeCategoryType 

  @Field(() => NoticeCategory, { nullable: true })
  noticeCategory?: NoticeCategory;

  @Field(() => NoticeStatus, { nullable: true })
  noticeStatus?: NoticeStatus;
}

// ✅ Shu joyga e’tibor ber!
@InputType()
export class NoticeInquiry {
  @IsOptional()
  @Field(() => NoticeCategoryType, { nullable: true, })
  noticeCategoryType?: NoticeCategoryType 


  @IsOptional()
  @Field(() => NoticeStatus, { nullable: true })
  noticeStatus?: NoticeStatus;

  @IsOptional()
  @Field(() => NoticeCategory, { nullable: true })
  noticeCategory?: NoticeCategory;


  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  search?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  sort?: string;

  @IsOptional()
  @Field(() => Direction, { nullable: true })
  direction?: Direction;

  @IsOptional()
  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  page?: number;

  @IsOptional()
  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(110)
  limit?: number;
}

