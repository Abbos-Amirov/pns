import { Resolver, Mutation, Args,Query,  } from '@nestjs/graphql'
import { CsService } from './cs.service';
import { MemberType } from '../../libs/enums/member.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Notice, NoticeListResponse } from '../../libs/dto/cs/notice.output';
import { CreateNoticeInput, NoticeInquiry, UpdateNoticeInput } from '../../libs/dto/cs/notice.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';

@Resolver()
export class CsResolver {

    constructor(private readonly csService: CsService) {}


    @UseGuards(WithoutGuard)
    @Query(() => NoticeListResponse)
    async getNoticeList(
      @Args('input') input: NoticeInquiry,
    ): Promise< NoticeListResponse> {
        console.log("getNoticeList: come Here");
        
      return this.csService.getNoticeList(input);
    }



  // ADMIN UCHUN hammasi
  //  CREATE NOTICE (faqat admin)
  @Roles(MemberType.ADMIN)
  @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    async createNotice(
      @Args('input') input: CreateNoticeInput, @AuthMember('_id') adminId: ObjectId): Promise<Notice> {

       
      return await this.csService.createNotice(input );
    }


    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    async updateNotice(
      @Args('input') input: UpdateNoticeInput,
    ): Promise<Notice> {
      return this.csService.updateNotice( input, );
    }

    @Roles(MemberType.ADMIN)
  @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    async deleteNotice(
      @Args('id') id: string,
    ): Promise<Notice> {
      return this.csService.deleteNotice(id);
    }


    // NOTICE

    // CsResolver.ts ichida

@Roles(MemberType.ADMIN)
@UseGuards(RolesGuard)
@Mutation(() => Notice)
public async createCsNotice(                             // 🔸 endpoint nomi
  @Args('input') input: CreateNoticeInput,
  @AuthMember('_id') adminId: ObjectId,
): Promise<Notice> {
  console.log('Mutation: createCsNotice');

  return await this.csService.createCsNotice({
    ...input,
    memberId: adminId,
  });
}

// ───────────────────────────────────────────────

// List endpoint (CS Center → Notice list)
@UseGuards(WithoutGuard)
@Query(() => NoticeListResponse)                         // ⚠️ sendagi list type nomini qo‘y
public async getCsNoticeList(                            // 🔸 endpoint nomi
  @Args('input') input: NoticeInquiry,
): Promise<{ list: Notice[]; total: number }> {
  console.log('Query: getCsNoticeList');

  return await this.csService.getCsNoticeList(input);
}
    
}
