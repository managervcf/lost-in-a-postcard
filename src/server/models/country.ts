// Import mongoose helpers.
import { Schema, model } from 'mongoose';
import { CountryDoc, CountryModel, UpdateCountryArgs } from '../types';

// Define schema.
const countrySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'Country already exists.'],
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

/**
 * Updates the country record.
 * 1. Perform validation checks.
 * 2. Update the record in the database.
 * 3. Return the updated record.
 */
countrySchema.statics.updateCountry = async function ({
  id,
  name,
  description,
}: UpdateCountryArgs): Promise<CountryDoc | null> {
  if (!id) {
    throw new Error('Must provide a country id');
  }
  if (!name) {
    throw new Error('Must provide a country name');
  }
  if (name.length < 3) {
    throw new Error('Country name must contain at least 3 characters.');
  }

  const updatedCountry = await Country.findByIdAndUpdate(
    id,
    { name, description },
    { new: true, runValidators: true }
  );
  return updatedCountry;
};

export const Country = model<CountryDoc, CountryModel>(
  'Country',
  countrySchema
);
