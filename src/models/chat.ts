import Chat from "../types/chat";
import { Schema, model } from "mongoose";

const chatSchema = new Schema<Chat>({
    admin: Schema.Types.ObjectId,
    users : [Schema.Types.ObjectId]
})


export default model<Chat>('chats' , chatSchema)