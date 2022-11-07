import * as joi from '@hapi/joi';

export const registerSchema = joi.object({
  userName: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  newMessage: joi.array(),
  isLogged: joi.boolean()
});

export const updateSchema = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  password: joi.string(),
  email: joi.string(),
  newMessage: joi.array(),
  imageProfile: joi.string(),
  isLogged: joi.boolean()
});
