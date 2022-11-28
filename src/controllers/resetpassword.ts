import sendMail from '../utils/gmail';
import { randomString } from '../utils/Random/index';
import { Request, Response, NextFunction } from 'express';
import user from '../models/user';
import ClientResponse from '../types/clientResponse';

export const resetpassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userName } = req.body;

    const userFound = await user.findOne({ userName });

    const recoveryPasswor = randomString(6);

    if (userFound) {
      await sendMail(
        userFound.email,
        'RESET PASSWORD',
        `Your recovery password  : ${recoveryPasswor}`,
      );

      res.json(<ClientResponse>{
        message:
          'We have sent a recovery password . Please check your mail box',
      });
    } else {
      res.json(<ClientResponse>{
        message:
          'We have sent a recovery password . Please check your mail box',
      });
    }
  } catch (error) {
    next(error);
  }
};
