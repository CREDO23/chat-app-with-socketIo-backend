"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    content: String,
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('messages', messageSchema);
//# sourceMappingURL=message.js.map