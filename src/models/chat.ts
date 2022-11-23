import Chat from '../types/chat';
import { Schema, model } from 'mongoose';

const chatSchema = new Schema<Chat>(
  {
    admin: Schema.Types.ObjectId,
    isPrivate: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    lastviews: {
      type : Map ,
      default : {}
    },
    messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }],
  },
  { timestamps: true },
);

export default model<Chat>('chats', chatSchema);
