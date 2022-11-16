import * as joi from '@hapi/joi';

export const registerSchema = joi.object({
  userName: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  isLogged: joi.boolean(),
});

export const loginSchema = joi.object({
  userName: joi.string().required(),
  password: joi.string().required(),
});

export const updateSchema = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  password: joi.string(),
  email: joi.string(),
  newMessage: joi.array(),
  avatar: joi.string(),
  isLogged: joi.boolean(),
  bio: joi.string(),
  lastConnection : joi.string()
});
