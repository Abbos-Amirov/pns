import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Member } from '../../libs/dto/member/member';
import * as fs from 'fs';
import * as path from 'path';
import { Location, Locations } from '../../libs/dto/location/location'
import { CityInquiry, CreateLocationInput, LocationsInquiry } from '../../libs/dto/location/location.input';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';
import { LikeService } from '../like/like.service';
import { Direction, Message } from '../../libs/enums/common.enum';
import { LocationUpdateInput } from '../../libs/dto/location/location.update';
import { LikeGroup } from '../../libs/enums/like.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';
import { lookupAuthMemberLiked, lookupMember } from '../../libs/config';
import { LikeInput } from '../../libs/dto/like/like.input';
import { OrdinaryInquiry } from '../../libs/dto/products/product.input';

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

      ;
  
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

  public async getLocations(
    memberId: ObjectId,
    input: LocationsInquiry,
  ): Promise<Locations> {
    const match: T = {}; // Location’da status bo‘lmasa bo‘sh obyekt kifoya

    const sort: T = {
      [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC,
    };
    console.log('sort:', sort);

    // Match query ni shakllantiramiz
    this.shapeLocationMatchQuery(match, input);
    console.log('match:', match);

    const result = await this.locationModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        {
          $facet: {
            list: [
              { $skip: (input.page - 1) * input.limit },
              { $limit: input.limit },
              // foydalanuvchi likelarini qo‘shamiz
              lookupAuthMemberLiked(memberId, LikeGroup.LOCATION),
              // member ma’lumotini qo‘shamiz
              lookupMember,
              { $unwind: '$memberData' },
            ],
            metaCounter: [{ $count: 'total' }],
          },
        },
      ])
      .exec();

    console.log('result:', result);

    if (!result.length)
      throw new InternalServerErrorException(Message.NO_DATA_FOUND);

    // Products dagidek: birinchi facet natijani qaytaramiz
    return result[0];
  }


    //** >>>>>>>>>>>>>>>>  updateLocation<<<<<<<<<<<<<<<<<<<<<<*/

    public async updateLocation(
      memberId: ObjectId,
      input: LocationUpdateInput,
    ): Promise<any> {
    
      const { _id, ...updateData } = input;
    
      const search = {
        _id: _id,
        memberId: memberId, // 🔐 faqat o‘z location’ini
      };
    
      console.log('SEARCH >>>', search);
      console.log('UPDATE >>>', updateData);
    
      try {
        const result = await this.locationModel
          .findOneAndUpdate(
            search,               // ✅ faqat qidirish
            { $set: updateData }, // ✅ faqat update
            { new: true },
          )
          .exec();
    
        console.log('RESULT >>>', result);
    
        if (!result) {
          throw new InternalServerErrorException(Message.UPDATE_FAILED);
        }
    
        return result;
      } catch (err: any) {
        console.log('Error, Location.update:', err.message);
        throw new InternalServerErrorException(Message.UPDATE_FAILED);
      }
    }

  public async getFavoriteLocations(
    memberId: ObjectId,
    input: CityInquiry,
  ): Promise<Locations> {
    const result = await this.likeService.getFavoriteLocation(memberId, input);
    console.log(">>>>>>>>resalt",result);
    
    return result;
  }


  public async getVisitedLocations(
    memberId: ObjectId,
    input: OrdinaryInquiry
  ): Promise<Locations> {
  
    return await this.viewService.getVisitedLocations(memberId, input);
  }



   //** >>>>>>>>>>>>>>>> lIKES <<<<<<<<<<<<<<<<<<<<<<*/

  public async likeTargetLocation(
    memberId: ObjectId,
    likeRefId: ObjectId,
  ): Promise<Location> {
    // 1) Target locationni tekshiramiz
    const target = await this.locationModel
      .findOne({ _id: likeRefId })
      .exec();
  
    if (!target)
      throw new InternalServerErrorException(Message.NO_DATA_FOUND);
  
    // 2) Like xizmatiga yuboramiz (toggle)
    const input: LikeInput = {
      memberId: memberId,
      likeRefId: likeRefId,
      likeGroup: LikeGroup.LOCATION,
    };
  
    // toggle → +1 yoki -1 qaytaradi
    const modifier: number = await this.likeService.toggleLike(input);
  
    // 3) Statistika yangilaymiz (locationLikes++)
    const result = await this.locationStatsEditor({
      _id: likeRefId,
      targetKey: 'locationLikes',
      modifier: modifier,
    });
  
    if (!result)
      throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
  
    return result;
  }

  // ADMIN
  public async removeLocationByAdmin(locationId: ObjectId): Promise<Location> {
    const search: T = { 
      _id: locationId,
    };
  
    const result = await this.locationModel
      .findOneAndDelete(search)
      .exec();
  
    if (!result)
      throw new InternalServerErrorException(Message.REMOVE_FAILED);
  
    return result;
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


  


  private shapeLocationMatchQuery(match: T, input: LocationsInquiry) {
    const { search } = input;
    if (!search) return;

    // memberId bo‘yicha filter
    if (search.id) {
      match.memberId = search.id;
    }

    // locationType ro‘yxati bo‘yicha filter
    if (search.typeList?.length) {
      match.locationType = { $in: search.typeList };
    }

    if (search.locationCity?.length) {
      match.locationCity = { $in: search.locationCity };
    }

    // text → locationName yoki address ichidan qidirish
    if (search.text) {
      match.$or = [
        { locationName: { $regex: search.text, $options: 'i' } },
        { address: { $regex: search.text, $options: 'i' } },
      ];
    }

    // kerak bo‘lsa latitude/longitude range larni keyin qo‘shib ketasan
  }


}