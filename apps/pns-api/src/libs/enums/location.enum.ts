import { registerEnumType } from '@nestjs/graphql';

export enum LocationType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  OFFICE = 'OFFICE',
  STORE = 'STORE',
  FACTORY = 'FACTORY',
}

registerEnumType(LocationType, {
  name: 'LocationType',
});