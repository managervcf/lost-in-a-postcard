import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { PhotoDoc, PhotoModel } from '../types';

// Define schema.
const photoSchema = new Schema(
  {
    upload: {
      size: {
        type: Number,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
    },
    caption: {
      type: String,
      default: '',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    clicks: {
      type: Number,
      default: 0,
      min: [0, 'Cannot set clicks to less than 0.'],
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  // Enable auto timestamps.
  { timestamps: true }
);

// Insert plugins.
photoSchema.plugin(mongoosePaginate);

// Create model out of schema.
export const Photo = model<PhotoDoc, PhotoModel>('Photo', photoSchema);
