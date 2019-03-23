// Import mongoose helpers.
import { Schema, model } from 'mongoose';

// Import searchung helper function.
import { doesContain } from '../utils';

// Define schema.
const countrySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: [true, 'Country already exists.'],
			required: [true, 'Country name is required.']
		},
		description: { type: String, default: 'No country description yet.' },
		photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
	},
	// Enable auto timestamps.
	{ timestamps: true }
);

const Country = model('Country', countrySchema);

export default Country;
