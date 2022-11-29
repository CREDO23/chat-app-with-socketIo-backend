import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';

type SingInput = {
  id: mongoose.Types.ObjectId;
  userName: string;
};

export const signAccessToken = async (
  credentials: SingInput,
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      {
        id: credentials.id,
        userName: credentials.userName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '100 day',
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
};

export const verifyToken = async (token: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
