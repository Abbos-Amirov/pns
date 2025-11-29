import { registerEnumType } from '@nestjs/graphql';

export enum LikeGroup {
	MEMBER = 'MEMBER',
	PRODUCT = 'PRODUCT',
	ARTICLE = 'ARTICLE',
	LOCATION = 'LOCATION',
}
registerEnumType(LikeGroup, {
	name: 'LikeGroup',
});
