import { expressjwt } from 'express-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

export default function () {
  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: ['/api/users/singin', '/api/users/singup', '/api/resetPassword'],
  });
}
