import { Schema } from 'mongoose';

interface Chat {
  isChannel: boolean;
  admin?: Schema.Types.ObjectId;
  brandName?: string;
  avatar: string;
  users: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
}

export default Chat;
