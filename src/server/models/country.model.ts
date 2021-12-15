import { Schema, model } from 'mongoose';
import { CountryAttributes, CountryDoc, CountryModel } from '../types';

// Define schema.
const countrySchema = new Schema<CountryDoc, CountryModel>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Country is required.'],
      minlength: [3, 'Country name must contain at least 3 characters.'],
      maxlength: [20, 'Country name must contain no more than 20 characters.'],
    },
    description: {
      type: String,
      default: '',
    },
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Photo',
      },
    ],
  },
  // Enable auto timestamps.
  { timestamps: true }
);

export const Country = model<CountryDoc, CountryModel>('Country', countrySchema);
