import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { LocationService } from './location.service';

import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { CreateLocationInput, LocationsInquiry } from '../../libs/dto/location/location.input';

// ❗ MUHIM — SHU IMPORT ETISH SHART!!!
import { Location, Locations } from '../../libs/dto/location/location';

import { Roles } from '../auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberType } from '../../libs/enums/member.enum';
import { LocationUpdateInput } from '../../libs/dto/location/location.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

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

}