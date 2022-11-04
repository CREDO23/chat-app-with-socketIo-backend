import { Request, Response, NextFunction } from 'express';
import { registerSchema } from '../utils/SchemaValidation/user';
import * as error from 'http-errors';
import user from '../models/user';
// import User from '../types/user';
import ClientResponse from '../types/clientResponse';


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerSchema.validateAsync(req.body);

    if (result) {
      const isExist = await user
        .findOne({ userName: req.body.userName })
        .catch((error) => next(error));

      if (isExist) {
        throw error.Conflict('User already exists');
      }

      //   console.log(bcrypt.hashSync(result.password , 25))

      const newUser = new user({
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
