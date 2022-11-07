import { Strategy } from 'passport-local';
import * as passport from 'passport';
import User from '../models/user';
import * as bcrypt from 'bcrypt';
import USER from '../types/user';
import * as express from 'express';

 const strategy = new Strategy(function (userName, password, callback) {
  User.findOne({ userName })
    .then(async (result) => {
      if (result) {
        const isMatch = await bcrypt.compareSync(password, result.password);

        if (isMatch) {
          return  callback(null, result);
        } else {
          return  callback(null, 'Invalid userName or password');
        }
      } else {
        return  callback(null, 'Invalid userName or password');
      }
    })
    .catch((error) => {
      return  callback(error);
    });
});

export const serialize = () =>
  passport.serializeUser((user: USER, callback) => {
    callback(null, user.userName);
  });

export const deserialize = () =>
  passport.deserializeUser((userName, callback) => {
    User.findOne({ userName }, (error, user: USER) => {
      if (error) callback(error);
      callback(null, user);
    });
  });


export const login = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (error) next(error);
  }

export default strategy;
