import Message from '../types/message';
import { Schema, model } from 'mongoose';

const messageSchema = new Schema<Message>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    recipient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    content: String,
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'chats',
    },
    isRead : {
      type : Boolean,
      default : false
    }
  },
  {
    timestamps: true,
  },
);

export default model<Message>('messages', messageSchema);
