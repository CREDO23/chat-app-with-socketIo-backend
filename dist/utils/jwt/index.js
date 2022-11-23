"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signAccessToken = void 0;
const jwt = require("jsonwebtoken");
const signAccessToken = async (credentials) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            id: credentials.id,
            userName: credentials.userName,
        }, process.env.JWT_SECRET, {
            expiresIn: '2 day',
        }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
exports.signAccessToken = signAccessToken;
const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=index.js.map