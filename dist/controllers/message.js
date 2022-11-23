"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const message_1 = require("../models/message");
const message_2 = require("../utils/SchemaValidation/message");
const createMessage = async (req, res, next) => {
    try {
        const result = await message_2.create.validateAsync(req.body);
        if (result) {
            const newMessage = new message_1.default({
                ...result,
            });
            const savedMessage = await newMessage.save();
            res.json({
                message: 'Created successfully',
                data: savedMessage,
                error: null,
                success: true,
            });
        }
    }
    catch (error) {
        if (error.isJoi)
            error.status = 422;
        next(error);
    }
};
exports.createMessage = createMessage;
//# sourceMappingURL=message.js.map