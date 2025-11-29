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
import { LikeGroup } from '../../libs/enums/like.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';

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
    const{memberId} = input;
    try {
      const result = await this.locationModel.create(input);
      console.log('result', result);
  
      // Agar measurer yoki member statistikasi bo‘lsa SENING structure bo‘yicha:
      const natija = await this.memberService.memberStatsEditor({
        _id: memberId,
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

  public async getLocation(memberId: ObjectId, locationId: ObjectId): Promise<any> {

    const search: T = {
      _id: locationId,
    };
  
    console.log("Qidirilayotgan location:", search);
  
    // 1️⃣ Locationni topamiz
    const targetLocation:any = await this.locationModel.findOne(search).lean().exec();
    if (!targetLocation)
      throw new InternalServerErrorException(Message.NO_DATA_FOUND);
  
    // 2️⃣ Agar member mavjud bo‘lsa → VIEW yozish
    if (memberId) {
      const viewInput = {
        memberId: memberId,
        viewRefId: locationId,
        viewGroup: ViewGroup.LOCATION,  // ❗ yangi view group
      };
  
      const newView = await this.viewService.recordView(viewInput);
  
      if (newView) {
        await this.locationStatsEditor({
          _id: locationId,
          targetKey: 'locationViews',
          modifier: 1,
        });
  
        targetLocation.locationViews++;
      }
  
      // 3️⃣ LIKE holati tekshiriladi
      const likeInput = {
        memberId: memberId,
        likeRefId: locationId,
        likeGroup: LikeGroup.LOCATION,  // ❗ yangi like group
      };
  
      targetLocation.meLiked = await this.likeService.checkLikeExistence(likeInput);
      console.log("targetLocation.meLiked:", targetLocation.meLiked);
    }
  
    // 4️⃣ Member ma’lumotlarini qo‘shamiz
    targetLocation.memberData = await this.memberService.getMember(
      null,
      targetLocation.memberId,
    );
  
    return targetLocation;
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


  public async locationStatsEditor(input: StatisticModifier): Promise<any | null> {
    const { _id, targetKey, modifier } = input;
  
    return await this.locationModel
      .findByIdAndUpdate(
        _id,
        { $inc: { [targetKey]: modifier } },
        { new: true },
      )
      .exec();
  }

}