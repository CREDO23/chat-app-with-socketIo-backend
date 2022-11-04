import { Schema } from 'mongoose'

interface Chat {
    admin: Schema.Types.ObjectId;
    users : Schema.Types.ObjectId[];
}


export default Chat