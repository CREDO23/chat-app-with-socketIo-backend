import Chat from '../types/chat';
import { Schema, model } from 'mongoose';

const chatSchema = new Schema<Chat>(
  {
    admin: Schema.Types.ObjectId,
    isChannel: {
      type: Boolean,
      default: false,
    },
    brandName: {
      type: String,
      default: 'Anonyme',
    },
    avatar: String,
    users: [Schema.Types.ObjectId],
    messages: [Schema.Types.ObjectId],
  },
  { timestamps: true },
);

export default model<Chat>('chats', chatSchema);
