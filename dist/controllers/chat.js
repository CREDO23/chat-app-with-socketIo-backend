"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLastViewChat = exports.addMessage = exports.getChatByUser = exports.createChat = void 0;
const chat_1 = require("../models/chat");
const message_1 = require("../models/message");
const error = require("http-errors");
const chat_2 = require("../utils/SchemaValidation/chat");
const mongoose_1 = require("mongoose");
const socket_1 = require("../socket");
const createChat = async (req, res, next) => {
    try {
        const result = await chat_2.create.validateAsync(req.body);
        const socket = socket_1.default.getInstance();
        if (result) {
            const newMessage = new message_1.default({
                ...req.body.message,
            });
            const savedMessage = await newMessage.save();
            if (savedMessage) {
                const newChat = new chat_1.default({
                    ...result,
                    messages: [savedMessage.id.toString()],
                });
                const savedChat = await (await (await newChat.save()).populate({
                    path: 'messages',
                    select: 'sender recipient content updatedAt',
                    options: { sort: { updatedAt: 1 } },
                    populate: [
                        {
                            path: 'sender',
                            select: 'userName',
                        },
                        {
                            path: 'recipient',
                            select: 'userName name',
                        },
                    ],
                })).populate({
                    path: 'users',
                    select: 'userName avatar',
                });
                const users = result.users;
                const connectedUsers = socket.sessions;
                Object.keys(connectedUsers).forEach((user) => {
                    if (users.some((userId) => new String(userId) == user)) {
                        socket.io.to(connectedUsers[user]).emit('newChat', savedChat);
                    }
                });
                socket.newChat(savedChat.name, savedChat);
                res.json({
                    message: 'Created successfully',
                    data: savedChat,
                    error: null,
                    success: true,
                });
            }
        }
    }
    catch (error) {
        if (error.isJoi)
            error.status = 422;
        next(error);
    }
};
exports.createChat = createChat;
const getChatByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (mongoose_1.default.isValidObjectId(userId)) {
            const result = await chat_1.default
                .find({ users: { $in: [`${userId}`] } })
                .populate({
                path: 'messages',
                select: 'sender recipient content updatedAt',
                options: { sort: { updatedAt: 1 } },
                populate: [
                    {
                        path: 'sender',
                        select: 'userName',
                    },
                    {
                        path: 'recipient',
                        select: 'userName name',
                    },
                ],
            })
                .populate({
                path: 'users',
                select: 'userName avatar',
            })
                .sort({ updatedAt: -1 });
            if (result) {
                res.json({
                    message: 'Chat found',
                    data: result,
                    error: null,
                    success: true,
                });
            }
        }
        else {
            throw error.NotFound('Invalid ID');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getChatByUser = getChatByUser;
const addMessage = async (req, res, next) => {
    try {
        const socket = socket_1.default.getInstance();
        const chatId = req.params.chatId;
        const result = await chat_2.pushMessage.validateAsync(req.body);
        const newMessage = new message_1.default({
            ...result,
        });
        const savedMessage = await newMessage.save();
        if (savedMessage) {
            const updatedChat = await chat_1.default
                .findByIdAndUpdate(chatId, {
                $push: { messages: savedMessage.id },
            }, { new: true })
                .populate({
                path: 'messages',
                select: 'sender recipient content updatedAt',
                options: { sort: { updatedAt: 1 } },
                populate: [
                    {
                        path: 'sender',
                        select: 'userName',
                    },
                    {
                        path: 'recipient',
                        select: 'userName name',
                    },
                ],
            })
                .populate({
                path: 'users',
                select: 'userName avatar',
            });
            socket.newChat(updatedChat.name, updatedChat);
            res.json({
                message: 'Message added successfully',
                data: updatedChat,
                error: null,
                success: true,
            });
        }
        else {
            throw error.InternalServerError('Somethings went wrong');
        }
    }
    catch (error) {
        if (error.isJoi)
            error.status = 422;
        next(error);
    }
};
exports.addMessage = addMessage;
const updateLastViewChat = async (req, res, next) => {
    try {
        const chatId = req.params.chatId;
        const userId = req.params.userId;
        const lastview = req.params.lastview;
        chat_1.default
            .findById(chatId)
            .then((result) => {
            result.lastviews.set(userId, lastview);
            result.save((error) => {
                if (error)
                    next(error);
                res.json({
                    message: `Chat updated successfully for ${userId}`,
                });
            });
        })
            .catch((error) => next(error));
    }
    catch (error) {
        next(error);
    }
};
exports.updateLastViewChat = updateLastViewChat;
//# sourceMappingURL=chat.js.map