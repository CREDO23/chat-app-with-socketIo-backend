import { Schema } from 'mongoose';

interface Message {
  sender: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  chat?: Schema.Types.ObjectId;
  content: string;
  isRead: boolean;
}

export default Message;
