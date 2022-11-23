"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const joi = require("@hapi/joi");
exports.create = joi.object({
    sender: joi.string().required(),
    recipient: joi.string().optional(),
    content: joi.string().required(),
});
//# sourceMappingURL=message.js.map