// Import helper to connect with database.
import { connect } from 'mongoose';

// Import models
import User from './user';
import Photo from './photo';

// Define functions that connects to database.
// Pass options to avoid deprecation warnings.
const connectDb = () =>
	connect(
		process.env.DATABASE_URL,
		{ useNewUrlParser: true, useCreateIndex: true },
		() => console.log('Conntected to database.')
	);

// Stitch together all models.
const models = { User, Photo };

// Export connectDb and unified models interface.
export { connectDb };
export default models;
