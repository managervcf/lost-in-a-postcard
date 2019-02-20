// Import helper to connect with database
import { connect } from 'mongoose';

// Import models
import User from './user';
import Message from './message';

// Define functions that connects to database.
// Pass 2 options to avoid deprecation warnings.
const connectDb = () =>
	connect(
		process.env.DATABASE_URL,
		{
			useNewUrlParser: true,
			useCreateIndex: true
		}
	);

// Stitch together all models
const models = { User, Message };

// Export connectDb and unified models interface
export { connectDb };
export default models;
