import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LocationService } from './location.service';

import { AuthMember } from '../auth/decorators/authMember.decorator';
import type { ObjectId } from 'mongoose';
import { CreateLocationInput } from '../../libs/dto/location/location.input';

// ❗ MUHIM — SHU IMPORT ETISH SHART!!!
import { Location } from '../../libs/dto/location/location';

import { Roles } from '../auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberType } from '../../libs/enums/member.enum';

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

    input.createdBy = memberId;  // <-- memberId shu yerga saqlanadi

    return await this.locationService.createLocation(input);
  }
}