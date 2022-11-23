"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bio: String,
    lastConnection: String,
    avatar: String,
    isLogged: Boolean,
}, {
    timestamps: true,
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});
exports.default = (0, mongoose_1.model)('users', userSchema);
//# sourceMappingURL=user.js.map