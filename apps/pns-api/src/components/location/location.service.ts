import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Member } from '../../libs/dto/member/member';
import * as fs from 'fs';
import * as path from 'path';
import { Location } from '../../libs/dto/location/location'
import { CreateLocationInput } from '../../libs/dto/location/location.input';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';
import { LikeService } from '../like/like.service';
import { Message } from '../../libs/enums/common.enum';
import { LocationUpdateInput } from '../../libs/dto/location/location.update';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('Location')
    private readonly locationModel: Model<Location>,
    private readonly memberService: MemberService,
    private viewService: ViewService,
    private likeService: LikeService,

  ) {}

  
  // ============ CREATE ONLY ============
  public async createLocation(input: CreateLocationInput): Promise<Location> {
    const{createdBy} = input;
    try {
      const result = await this.locationModel.create(input);
      console.log('result', result);
  
      // Agar measurer yoki member statistikasi bo‘lsa SENING structure bo‘yicha:
      const natija = await this.memberService.memberStatsEditor({
        _id: createdBy,
        targetKey: 'memberProducts',   // SEN O'ZING BELGILAYSAN
        modifier: 1,
      });
  
      console.log('natija', natija);
  
      return result;
    } catch (err: any) {
      console.log('Error, Service.model:', err.message);
      throw new BadRequestException(Message.CREATE_FAILED);
    }
  }

  public async updateLocation(
    memberId: ObjectId,
    input: LocationUpdateInput,
  ): Promise<any> {
    const search = {
      _id: input._id,
      createdBy: memberId, // faqat o‘z yaratgan joyni update qilsin
    };

    try {
      const result = await this.locationModel
        .findOneAndUpdate(search, input, { new: true })
        .exec();

      if (!result) {
        throw new InternalServerErrorException(Message.UPDATE_FAILED);
      }

      return result;
    } catch (err: any) {
      console.log('Error, Location.update:', err.message);
      throw new InternalServerErrorException(Message.UPDATE_FAILED);
    }
  }

}