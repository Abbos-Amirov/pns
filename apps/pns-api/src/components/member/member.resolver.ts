import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from '../../libs/dto/member/member';
import { MemberInput } from '../../libs/dto/member/member.input';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Resolver()
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  public async signup( @Args('input') input: MemberInput): Promise<Member> {
   try{
    console.log('Mutation: signup');
    return await this.memberService.signup(input);

   }catch(err){
    console.log('ERROR' ,err);
    throw new InternalServerErrorException
    

   }
  }

  @Mutation(() => String)
  public async login(): Promise<string> {
    console.log('Mutation: login');
    return this.memberService.login();
  }

  @Mutation(() => String)
  public async updateMember(): Promise<string> {
    console.log('Mutation: updateMember');
    return this.memberService.updateMember();
  }

  @Query(() => String)
  public async getMember(): Promise<string> {
    console.log('Query: getMember');
    return this.memberService.getMember();
  }
}