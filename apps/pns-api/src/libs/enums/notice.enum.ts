import { registerEnumType } from '@nestjs/graphql';

export enum NoticeCategory {
	FAQ = 'FAQ',
	TERMS = 'TERMS',
	INQUIRY = 'INQUIRY',
}
registerEnumType(NoticeCategory, {
	name: 'NoticeCategory',
});

export enum NoticeStatus {
	HOLD = 'HOLD',
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(NoticeStatus, {
	name: 'NoticeStatus',
});
export enum NoticeCategoryType {
	PROPERTY = 'PROPERTY',           // Property
	PAYMENT = 'PAYMENT',             // Payment
	LOCATION = 'LOCATION',  
	FOR_BUYERS = 'FOR_BUYERS',       // For Buyers
	FOR_AGENTS = 'FOR_AGENTS',       // For Agents
	MEMBERSHIP = 'MEMBERSHIP',       // Membership
	COMMUNITY = 'COMMUNITY',         // Community
	OTHER = 'OTHER',                 // Other
}  
registerEnumType(NoticeCategoryType, {
	name: 'NoticeCategoryType',
});
