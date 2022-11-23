"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi = require("@hapi/joi");
exports.registerSchema = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    isLogged: joi.boolean(),
});
exports.loginSchema = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
});
exports.updateSchema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    password: joi.string(),
    email: joi.string(),
    newMessage: joi.array(),
    avatar: joi.string(),
    isLogged: joi.boolean(),
    bio: joi.string(),
    lastConnection: joi.string()
});
//# sourceMappingURL=user.js.map