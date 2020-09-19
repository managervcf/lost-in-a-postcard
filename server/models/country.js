// Import mongoose helpers.
import { Schema, model } from 'mongoose';
import { throwError } from '../utils';

// Define schema.
const countrySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'Country already exists.'],
      required: [true, 'Country is required.'],
      minlength: [2, 'Country name must contain at least 2 characters.'],
      maxlength: [20, 'Country name must contain no more than 20 characters.'],
    },
    description: {
      type: String,
      default: 'There is no country description yet.',
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

countrySchema.statics.updateCountry = async function ({
  id,
  name,
  description,
}) {
  /**
   * 1. Perform validation checks.
   * 2. Update the record in the database.
   * 3. Return the updated record.
   */
  throwError(!id, 'Must provide a country id');
  throwError(!name, 'Must provide a country name');
  throwError(
    name.length < 3,
    'Country name must contain at least 2 characters.'
  );
  const updatedCountry = await Country.findByIdAndUpdate(
    id,
    { name, description },
    { new: true, runValidators: true }
  );
  return updatedCountry;
};

const Country = model('Country', countrySchema);

export default Country;
