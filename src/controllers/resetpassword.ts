import sendMail from '../utils/gmail';
import { randomString } from '../utils/Random/index';
import { Request, Response, NextFunction } from 'express';
import user from '../models/user';
import ClientResponse from '../types/clientResponse';
import * as bcrypt from 'bcrypt';

export const resetpassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userName } = req.body;

    const recoveryPasswor = randomString(6);

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(recoveryPasswor, salt);

    const updatedUser = await user.findOneAndUpdate(
      { userName },
      { password: hash },
    );

    if (updatedUser) {
      await sendMail(
        updatedUser.email,
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
