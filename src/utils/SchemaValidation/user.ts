import * as joi from '@hapi/joi';

export const registerSchema = joi.object({
  userName: joi.string().required(),
  firstName: joi.string().optional(),
  lastName: joi.string().optional(),
  password: joi.string().required(),
  email: joi.string().required(),
  newMessage: joi.array().optional(),
  isLogged: joi.boolean()
});

export const updateSchema = joi.object({
  firstName: joi.string().optional(),
  lastName: joi.string().optional(),
  password: joi.string().optional(),
  email: joi.string().optional(),
  newMessage: joi.array().optional(),
  imageProfile: joi.string().optional(),
  isLogged: joi.boolean().optional()
});
