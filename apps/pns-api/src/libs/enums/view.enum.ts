import { registerEnumType } from '@nestjs/graphql';

export enum ViewGroup {
	MEMBER = 'MEMBER',
	ARTICLE = 'ARTICLE',
	PRODUCT = 'PRODUCT',
	LOCATION = 'LOCATION',
}
registerEnumType(ViewGroup, {
	name: 'ViewGroup',
});
