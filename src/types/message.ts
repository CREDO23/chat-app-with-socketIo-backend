import { Schema } from 'mongoose'

interface Message {
    sender: Schema.Types.ObjectId;
    recipient: Schema.Types.ObjectId;
    chat: Schema.Types.ObjectId | null;
    isRead : boolean;
}




export default Message