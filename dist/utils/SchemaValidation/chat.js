"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLastView = exports.pushMessage = exports.create = void 0;
const joi = require("@hapi/joi");
exports.create = joi.object({
    isPrivate: joi.boolean().optional(),
    admin: joi.string().optional(),
    name: joi.string().optional(),
    avatar: joi.string().optional(),
    users: joi.array().required(),
    message: joi.object({
        sender: joi.string().required(),
        recipient: joi.string().optional(),
        content: joi.string().required()
    })
});
exports.pushMessage = joi.object({
    sender: joi.string().required(),
    recipient: joi.string().optional(),
    content: joi.string().required()
});
exports.updateLastView = joi.object({
    userName: joi.string().required(),
    lastview: joi.string().required()
});
//# sourceMappingURL=chat.js.map