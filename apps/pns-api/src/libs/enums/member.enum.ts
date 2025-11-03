import { registerEnumType } from '@nestjs/graphql';

export enum MemberType {
  USER = 'USER',
  MEASURER = 'MEASURER',  // o‘lchov oladigan
  ADMIN = 'ADMIN',
  INSTALLER = 'INSTALLER', // o‘rnatadigan
    CUSTOMER = 'CUSTOMER',   // mijoz
  
}

registerEnumType(MemberType, {
  name: 'MemberType',
});

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  BLOCK = 'BLOCK',
  DELETE = 'DELETE',
}

registerEnumType(MemberStatus, {
  name: 'MemberStatus',
});

export enum MemberAuthType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  TELEGRAM = 'TELEGRAM',
}

registerEnumType(MemberAuthType, {
  name: 'MemberAuthType',
});