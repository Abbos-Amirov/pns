import  {  Schema } from 'mongoose';
import { LocationType } from '../libs/enums/location.enum';


const LocationSchema = new Schema(
  {
    locationName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    

locationViews: {
  type: Number,
  default: 0,
  required: true,
},

    locationType: {
      type: String,
      enum: LocationType,
      required: true,
    },

    locationLikes: {
      type: Number,
      default: 0,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    images: {
      type: [String], // URL lar
      default: [],
      required: false,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Member', // ishlab chiqargan yoki o‘lchov olgan a’zoni bildiradi
    },
    
  

    
  },
  {
    timestamps: true,
    collection: 'locations',
  },
);

export default LocationSchema;