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

    locationType: {
      type: String,
      enum: LocationType,
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

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'locations',
  },
);

export default LocationSchema;