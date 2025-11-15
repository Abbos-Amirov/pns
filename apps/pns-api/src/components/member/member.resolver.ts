import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { BadRequestException, InternalServerErrorException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';

@Resolver()
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  public async signup( @Args('input') input: MemberInput): Promise<Member> {
    console.log('Mutation: signup');
    return await this.memberService.signup(input);

  }

  @Mutation(() => Member)
  public async login(@Args('input') input: LoginInput): Promise<Member> {
    console.log('Mutation: login');
    return this.memberService.login(input);
  }
 @UseGuards(AuthGuard)
  @Mutation(() => String)
  public async updateMember(): Promise<string> {
    console.log('Mutation: updateMember');
    return this.memberService.updateMember();
  }


  @UseGuards(AuthGuard)
  @Query(() => String)
  public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
    console.log("AuthMember =>" ,memberNick);
    
    console.log('Mutation: updateMember');
    return  ` salom ${memberNick}`;
  }
  @Query(() => String)
  public async getMember(): Promise<string> {
    console.log('Query: getMember');
    return this.memberService.getMember();
  }


   // >>>>>>>>> ADMIN <<<<<<<<<<<<<<<<

 // Authorization: ADMIN
 @Mutation (() => String )
 public async getAllMembesByAdmin(): Promise<string> {
   return  this.memberService.getAllMembesByAdmi();
 }

 // Authorization: ADMIN
 @Mutation (() => String )
 public async updateMembesByAdmin(): Promise<string> {
    console.log('Mutatin;  updateMembesByAdmin');
   return this.memberService.updateMembesByAdmin()
 }

  

}