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

export enum LocationCity {
  SEOUL = 'SEOUL',
  BUSAN = 'BUSAN',
  INCHEON = 'INCHEON',
  DAEGU = 'DAEGU',
  DAEJEON = 'DAEJEON',
  GWANGJU = 'GWANGJU',
  ULSAN = 'ULSAN',
  SUWON = 'SUWON',
  CHEONAN = 'CHEONAN',
  JEJU = 'JEJU',
  OTHER = 'OTHER', // boshqa joylar uchun
}

// GraphQL registratsiya — bu enumni schema.graphql’da ishlatish uchun
registerEnumType(LocationCity, {
  name: 'LocationCity',
  description: 'Mahsulot joylashuvi (shahar yoki region)',
});