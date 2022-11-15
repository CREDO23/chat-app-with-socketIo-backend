import { Schema } from 'mongoose';

interface Chat {
  admin?: Schema.Types.ObjectId;
  isPrivate : boolean;
  name: string;
  avatar: string;
  users: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
}

export default Chat;
