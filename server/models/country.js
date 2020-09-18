// Import mongoose helpers.
import { Schema, model } from 'mongoose';

// Define schema.
const countrySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'Country already exists.'],
      required: [true, 'Country is required.'],
      minlength: [2, 'Country must be at least 2 characters.'],
      maxlength: [20, 'Country must be no more than 20 characters.'],
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

const Country = model('Country', countrySchema);

export default Country;
