import { Resolver, Mutation, Args,Query,  } from '@nestjs/graphql'
import { CsService } from './cs.service';
import { MemberType } from '../../libs/enums/member.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Notice } from '../../libs/dto/cs/notice.output';
import { CreateNoticeInput } from '../../libs/dto/cs/notice.input';

@Resolver()
export class CsResolver {

    constructor(private readonly csService: CsService) {}



  // ADMIN UCHUN hammasi
  //  CREATE NOTICE (faqat admin)
  @Roles(MemberType.ADMIN)
  @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    async createNotice(
      @Args('input') input: CreateNoticeInput,
    ): Promise<Notice> {
      return this.csService.createNotice(input, );
    }
}
