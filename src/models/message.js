// import helper functions from mongoose
import { Schema, model } from 'mongoose';

// Define schema
const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  }
});

// Create model 'Message' out of messageSchema
const Message = model('Message', messageSchema);

export default Message;