import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { LocationService } from './location.service';

import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { CityInquiry, CreateLocationInput, LocationsInquiry } from '../../libs/dto/location/location.input';

// ❗ MUHIM — SHU IMPORT ETISH SHART!!!
import { Location, Locations } from '../../libs/dto/location/location';

import { Roles } from '../auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberType } from '../../libs/enums/member.enum';
import { LocationUpdateInput } from '../../libs/dto/location/location.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OrdinaryInquiry } from '../../libs/dto/products/product.input';

@Resolver(() => Location)  // <-- MUHIM
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Roles(MemberType.MEASURER)
  @UseGuards(RolesGuard)
  @Mutation(() => Location)
  public async createLocation(
    @Args('input') input: CreateLocationInput,
    @AuthMember('_id') memberId: ObjectId,
  ): Promise<Location> {
    console.log('Mutation: createLocation');

    input.memberId = memberId;  // <-- memberId shu yerga saqlanadi

    return await this.locationService.createLocation(input);
  }

  @UseGuards(WithoutGuard)
@Query(() => Location)
public async getLocation(
  @Args('locationId') input: string,
  @AuthMember('_id') memberId: ObjectId,
): Promise<Location> {
  console.log("Query: getLocation");

  const locationId = shapeIntoMongoObjectId(input);

  return await this.locationService.getLocation(memberId, locationId);
}

@UseGuards(WithoutGuard)
@Query(() => Locations)
public async getLocations(
  @Args('input') input: LocationsInquiry,
  @AuthMember('_id') memberId: ObjectId,
): Promise<Locations> {
  console.log('Query: getLocations');

  return await this.locationService.getLocations(memberId, input);
}



  @Roles(MemberType.MEASURER)
  @UseGuards(RolesGuard)
  @Mutation(() => Location)
  public async updateLocation(
    @Args('input') input: LocationUpdateInput,
    @AuthMember('_id') memberId: ObjectId,
  ): Promise<Location> {
    console.log('Mutation: updateLocation');

    input._id = shapeIntoMongoObjectId(input._id);

    return await this.locationService.updateLocation(memberId, input);
  }




  @UseGuards(AuthGuard)
@Query(() => Locations)
public async getFavoriteLocations(
  @Args('input') input: CityInquiry,
  @AuthMember('_id') memberId: ObjectId,
): Promise<Locations> {
  console.log('Query: getFavoriteLocations');
  return await this.locationService.getFavoriteLocations(memberId, input);
}

@UseGuards(AuthGuard)
@Query(() => Locations)
public async getVisitedLocations(
  @Args('input') input: OrdinaryInquiry,
  @AuthMember('_id') memberId: ObjectId,
): Promise<Locations> {
  console.log('Query: getVisitedLocations');
  return await this.locationService.getVisitedLocations(memberId, input);
}

@UseGuards(AuthGuard)
@Mutation(() => Location)
public async likeTargetLocation(
  @Args('locationId') input: string,
  @AuthMember('_id') memberId: ObjectId,
): Promise<Location> {
  console.log('Mutation: likeTargetLocation');

  const likeRefId = shapeIntoMongoObjectId(input);

  return await this.locationService.likeTargetLocation(memberId, likeRefId);
}


  // ADMIN


  @Roles(MemberType.ADMIN, MemberType.MEASURER)
@UseGuards(RolesGuard)
@Mutation(() => Location)
public async removeLocationByAdmin(
  @Args('locationId') input: string,
): Promise<Location> {
  console.log('Mutation: removeLocationByAdmin');

  const locationId = shapeIntoMongoObjectId(input);

  return await this.locationService.removeLocationByAdmin(locationId);
}

}