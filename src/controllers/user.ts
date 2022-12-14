import { Request, Response, NextFunction } from 'express';
import {
  registerSchema,
  updateSchema,
  loginSchema,
} from '../utils/SchemaValidation/user';
import * as error from 'http-errors';
import User from '../models/user';
import USER from '../types/user';
import ClientResponse from '../types/clientResponse';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { signAccessToken } from '../utils/jwt/index';
import user from '../models/user';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: USER = await registerSchema.validateAsync(req.body);

    if (result) {
      const isExist = await User.findOne({ userName: result.userName });

      if (isExist) {
        throw error.Conflict('User already exists');
      }

      const newUser = new User({
        ...result,
      });

      const savedUser = await newUser.save();

      res.json(<ClientResponse>{
        message: 'User created successfully',
        data: {
          accessToken: await signAccessToken({
            id: savedUser.id,
            userName: savedUser.userName,
          }),
          user: savedUser,
        },
        error: null,
        success: true,
      });
    }
  } catch (error) {
    if (error.isJoi) error.status = 422;

    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result: USER = await loginSchema.validateAsync(req.body);

    const user = await User.findOne({ userName: result.userName });

    if (!user) {
      throw error.NotFound('Incorect userName or password');
    }

    const isMatch = await bcrypt.compareSync(result.password, user.password);

    if (!isMatch) {
      throw error.NotAcceptable('Incorect userName or password');
    }

    res.json(<ClientResponse>{
      message: `Authenticate as ${user.email}`,
      data: {
        accessToken: await signAccessToken({
          id: user.id,
          userName: user.userName,
        }),
        user,
      },
      error: null,
      success: true,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

export const getAllusers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const search = req?.query?.search || 'all';

    if (search == 'all') {
      const users = await User.find({}).select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      });

      res.json(<ClientResponse>{
        message: 'All users',
        data: users,
        error: null,
        success: true,
      });
    } else {
      const users = await User.find({
        userName: { $in: [new RegExp(`${search}`, 'i')] },
      });

      res.json(<ClientResponse>{
        message: 'All users',
        data: users,
        error: null,
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.isValidObjectId(id)) {
      const user = await User.findById(id).select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      });

      if (!user) {
        throw error.NotFound('User not found');
      }

      res.json(<ClientResponse>{
        message: 'User',
        data: user,
        error: null,
        success: true,
      });
    } else {
      throw error.BadRequest('Invald ID');
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (mongoose.isValidObjectId(id)) {
      const result: USER = await updateSchema.validateAsync(body);

      const updatedUser = await User.findByIdAndUpdate(id, result, {
        new: true,
      }).select({ password: 0, createdAt: 0, updatedAt: 0 });

      if (!updatedUser) {
        throw error.NotFound('User not found');
      }
      res.json(<ClientResponse>{
        message: 'Updated successfully',
        data: updatedUser,
        error: null,
        success: true,
      });
    } else {
      throw error.BadRequest('Invalid ID');
    }
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.isValidObjectId(id)) {
      const { password } = req.body;

      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password, salt);

      const updtedUser = await user.findByIdAndUpdate(id, { password: hash });

      if (updtedUser) {
        res.json(<ClientResponse>{
          message: 'Password changed',
        });
      }
    } else {
      throw error.BadRequest('Invalid ID');
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.isValidObjectId(id)) {
      const deletedUser = await User.findByIdAndDelete(id).select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      });

      if (!deletedUser) {
        throw error.NotFound('User not found');
      }

      res.json(<ClientResponse>{
        message: 'Deleted successfully',
        data: deletedUser,
        error: null,
        success: true,
      });
    } else {
      throw error.BadRequest('Invalid ID');
    }
  } catch (error) {
    next(error);
  }
};
