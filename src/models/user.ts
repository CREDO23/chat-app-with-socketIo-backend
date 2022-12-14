import User from '../types/user';
import { Schema, model } from 'mongoose';
import * as express from 'express';
import * as bcrypt from 'bcrypt';

const userSchema = new Schema<User>(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: String,
    lastConnection: String,
    avatar: String,
    isLogged: Boolean,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next: express.NextFunction) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

export default model<User>('users', userSchema);
