
import { ObjectId } from 'bson';


// =======================
//  OBJECT ID HANDLER
// =======================
export const shapeIntoMongoObjectId = (target: any) => {
  return typeof target === 'string' ? new ObjectId(target) : target;
};
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { T } from './types/common';


// =======================
// IMAGE CONFIGURATION
// =======================

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
	return uuidv4() + ext;
};

export const availableOptions = [ 'propertyRent'];

export const availableProductSorts = [
	'createdAt',
	'updatedAt',
	'productLikes',
	'productViews',
	'productRank',
	'productPrice',
  ];

  

export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];

export const availableCommentSorts = ['createdAt', 'updatedAt']


// =======================
//  MEMBER LOOKUP (AGGREGATION)
// =======================
export const lookupMember = {
	$lookup: {
	  from: 'members',        // qaysi collectiondan bog‘lanadi
	  localField: 'memberId', // property ichidagi field
	  foreignField: '_id',    // members collectionidagi field
	  as: 'memberData',       // natijada qaytariladigan alias nomi
	},
  };

  export const lookupFollowingData = {
	$lookup: {
	  from: 'members',
	  localField: 'followingId',
	  foreignField: '_id',
	  as: 'followingData',
	},
  };
  
  export const lookupFollowerData = {
	$lookup: {
	  from: 'members',
	  localField: 'followerId',
	  foreignField: '_id',
	  as: 'followerData',
	},
  };

  export const lookupAuthMemberLiked = (memberId: T , targetRefId: string = '$_id') =>{
	return{
	  $lookup: {
		from: 'likes',
		let: {
		  localLikeRefId: targetRefId,
		  localMemberId: memberId,
		  localMyFavorite: true,
		},
		pipeline: [
		  {
			$match:{
			  $expr: {
				$and: [
				  { $eq: ['$likeRefId', '$$localLikeRefId'] },
				  { $eq: ['$memberId', '$$localMemberId'] }, ],
			  },
			},
		  },
	
		  {
			$project: {
			  _id: 1,
			  memberId:1,
			  likeRefId: 1,
			  myFavorite: '$$localMyFavorite',
			},  
		  }
		],
		as: 'meLiked',
	
	  }
	};
	};


	interface LookupAuthMemberFollowed {
		followerId: T;
		followingId: string;
	  }
	  
	  export const lookupAuthMemberFollowed = (input:LookupAuthMemberFollowed ) =>{
		const { followerId, followingId} = input
		return{
		  $lookup: {
			from: 'follows',
			let: {
			  localFollowerId: followerId,
			  localFollowingId: followingId,
			  localMyFavorite: true,
			},
			pipeline: [
			  {
				$match:{
				  $expr: {
					$and: [
					  { $eq: ['$followerId', '$$localFollowerId'] },
					  { $eq: ['$followingId', '$$localFollowingId'] }, ],
				  },
				},
			  },
		
			  {
				$project: {
				  _id: 1,
				 followerId:1,
				  followingId: 1,
				  myFollowing: '$$localMyFavorite',
				},  
			  },
			],
			as: 'meFollowed',
		
		  }
		};
		};
		export const lookupFavorite = {
			$lookup: {
			  from: 'members',
			  localField: 'favoriteProduct.memberId',
			  foreignField: '_id',
			  as: 'favoriteProduct.memberData',
			},
		  };

		  export const lookupVisit = {
			$lookup: {
			  from: 'members',
			  localField: 'visitedProducts.memberId',
			  foreignField: '_id',
			  as: 'visitedProducts.memberData',
			},
		  };
