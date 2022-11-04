import User from '../types/user';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
  },
  firstName: String,
  lastaName: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  newMessage: {
    type: [Schema.Types.ObjectId],
    ref: 'messages',
  },
});

export default model<User>('users', userSchema);
