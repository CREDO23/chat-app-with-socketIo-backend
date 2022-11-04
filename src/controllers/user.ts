import { Request, Response, NextFunction } from 'express';
import { registerSchema, updateSchema } from '../utils/SchemaValidation/user';
import * as error from 'http-errors';
import User from '../models/user';
import USER from '../types/user';
import ClientResponse from '../types/clientResponse';
import mongoose from 'mongoose';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: USER = await registerSchema.validateAsync(req.body);

    if (result) {
      const isExist = await User.findOne({ userName: req.body.userName }).catch(
        (error) => next(error),
      );

      if (isExist) {
        throw error.Conflict('User already exists');
      }

      const newUser = new User({
        ...result,
      });

      const savedUser = await newUser.save();

      res.json(<ClientResponse>{
        message: 'User created successfully',
        data: savedUser,
        error: null,
        success: true,
      });
    }
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
    const page = req?.query?.page || 1;
    const pageSize = req?.query?.size || 5;
    const search = req?.query?.search || '';
    const sort = req?.query?.sort || 'asc';
    const logged = req?.query?.isLogged || false;

    const documents = await User.find({})
      .sort(sort.toString())
      .where({
        $and: [{ isLogged: logged }],
      });

    const users = await User.find({})
      .sort(sort.toString())
      .limit(Number(pageSize))
      .skip((Number(page) - 1) * Number(pageSize))
      .where({
        $and: [{ isLogged: logged }],
      });

    if (!users[0]) {
      throw error.NotFound('Not users yet');
    }

    const totalDocuments = documents.length;

    res.json(<ClientResponse>{
      message: 'All users',
      data: users,
      error: null,
      success: true,
      info: {
        totalDocuments,
        totalPages: Math.floor(totalDocuments / Number(pageSize)) || 1,
        sort,
        page,
        pageSize,
        search,
      },
    });
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
      const user = await User.findById(id).catch((error) => next(error));

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
      }).catch((error) => next(error));

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

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.isValidObjectId(id)) {
      const deletedUser = await User.findByIdAndDelete(id).catch((error) =>
        next(error),
      );

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
