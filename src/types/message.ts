import { Schema } from 'mongoose';

interface Message {
  sender: Schema.Types.ObjectId;
  recipient?: Schema.Types.ObjectId;
  content: string;
}

export default Message;
