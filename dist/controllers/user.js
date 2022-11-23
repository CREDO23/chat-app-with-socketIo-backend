"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllusers = exports.login = exports.register = void 0;
const user_1 = require("../utils/SchemaValidation/user");
const error = require("http-errors");
const user_2 = require("../models/user");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const index_1 = require("../utils/jwt/index");
const register = async (req, res, next) => {
    try {
        const result = await user_1.registerSchema.validateAsync(req.body);
        if (result) {
            const isExist = await user_2.default.findOne({ userName: result.userName });
            if (isExist) {
                throw error.Conflict('User already exists');
            }
            const newUser = new user_2.default({
                ...result,
            });
            const savedUser = await newUser.save();
            res.json({
                message: 'User created successfully',
                data: {
                    accessToken: await (0, index_1.signAccessToken)({
                        id: savedUser.id,
                        userName: savedUser.userName,
                    }),
                    user: savedUser,
                },
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
exports.register = register;
const login = async (req, res, next) => {
    try {
        const result = await user_1.loginSchema.validateAsync(req.body);
        const user = await user_2.default.findOne({ userName: result.userName });
        if (!user) {
            throw error.NotFound('Incorect userName or password');
        }
        const isMatch = await bcrypt.compareSync(result.password, user.password);
        if (!isMatch) {
            throw error.NotAcceptable('Incorect userName or password');
        }
        res.json({
            message: `Authenticate as ${user.email}`,
            data: {
                accessToken: await (0, index_1.signAccessToken)({
                    id: user.id,
                    userName: user.userName,
                }),
                user,
            },
            error: null,
            success: true,
        });
    }
    catch (error) {
        if (error.isJoi)
            error.status = 422;
        next(error);
    }
};
exports.login = login;
const getAllusers = async (req, res, next) => {
    try {
        const search = req?.query?.search || 'all';
        if (search == 'all') {
            const users = await user_2.default.find({}).select({
                password: 0,
                createdAt: 0,
                updatedAt: 0,
            });
            res.json({
                message: 'All users',
                data: users,
                error: null,
                success: true,
            });
        }
        else {
            const users = await user_2.default.find({
                userName: { $in: [new RegExp(`${search}`, 'i')] },
            });
            res.json({
                message: 'All users',
                data: users,
                error: null,
                success: true,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getAllusers = getAllusers;
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (mongoose_1.default.isValidObjectId(id)) {
            const user = await user_2.default.findById(id).select({
                password: 0,
                createdAt: 0,
                updatedAt: 0,
            });
            if (!user) {
                throw error.NotFound('User not found');
            }
            res.json({
                message: 'User',
                data: user,
                error: null,
                success: true,
            });
        }
        else {
            throw error.BadRequest('Invald ID');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        if (mongoose_1.default.isValidObjectId(id)) {
            const result = await user_1.updateSchema.validateAsync(body);
            const updatedUser = await user_2.default.findByIdAndUpdate(id, result, {
                new: true,
            }).select({ password: 0, createdAt: 0, updatedAt: 0 });
            if (!updatedUser) {
                throw error.NotFound('User not found');
            }
            res.json({
                message: 'Updated successfully',
                data: updatedUser,
                error: null,
                success: true,
            });
        }
        else {
            throw error.BadRequest('Invalid ID');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (mongoose_1.default.isValidObjectId(id)) {
            const deletedUser = await user_2.default.findByIdAndDelete(id).select({
                password: 0,
                createdAt: 0,
                updatedAt: 0,
            });
            if (!deletedUser) {
                throw error.NotFound('User not found');
            }
            res.json({
                message: 'Deleted successfully',
                data: deletedUser,
                error: null,
                success: true,
            });
        }
        else {
            throw error.BadRequest('Invalid ID');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map