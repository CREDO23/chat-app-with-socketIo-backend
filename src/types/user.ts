import { Schema } from 'mongoose';
interface USER {
  userName: string;
  firstName: string;
  lastaName: string;
  password: string;
  email: string;
  newMessage: Schema.Types.ObjectId[];
  imageProfile: string;
}

export default USER;
