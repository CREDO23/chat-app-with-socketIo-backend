import { Schema } from 'mongoose';

interface Chat {
  isGroup: boolean;
  admin?: Schema.Types.ObjectId;
  brandName?: string;
  avatar: string;
  users: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
}

export default Chat;
