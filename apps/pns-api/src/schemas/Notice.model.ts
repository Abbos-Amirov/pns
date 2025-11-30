import mongoose, { Schema } from 'mongoose';
import { NoticeCategory, NoticeCategoryType, NoticeStatus } from '../libs/enums/notice.enum';

const NoticeSchema = new Schema(
	{
		noticeCategory: {
			type: String,
			enum: NoticeCategory,
			required: true,
		},

		noticeCategoryType: {
			type: String,
			enum: NoticeCategoryType,
			required: true,
		},

		noticeStatus: {
			type: String,
			enum: NoticeStatus,
			default: NoticeStatus.ACTIVE,
		},

		noticeTitle: {
			type: String,
			required: true,
		},

		noticeContent: {
			type: String,
			required: true,
		},
		
		memberId: {
			type: Schema.Types.ObjectId,
			ref: 'Member',
		},
	},
	{ timestamps: true, collection: 'notices' },
);

export default NoticeSchema;
