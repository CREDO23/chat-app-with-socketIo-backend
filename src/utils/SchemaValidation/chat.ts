import * as joi from '@hapi/joi'

export const create = joi.object({
    isPrivate: joi.boolean().optional(),
    admin: joi.string().optional(),
    name: joi.string().optional(),
    avatar: joi.string().optional(),
    users: joi.array().required(),
    messages: joi.array().required()
})