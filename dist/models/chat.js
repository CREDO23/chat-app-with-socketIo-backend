"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    admin: mongoose_1.Schema.Types.ObjectId,
    isPrivate: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'users' }],
    lastviews: {
        type: Map,
        default: new Map(),
    },
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'messages' }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('chats', chatSchema);
//# sourceMappingURL=chat.js.map