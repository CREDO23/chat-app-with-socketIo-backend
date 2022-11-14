import * as joi from '@hapi/joi'

export const create = joi.object({
    isChannel: joi.boolean().optional(),
    admin: joi.string().optional(),
    brandName: joi.string().optional(),
    avatar: joi.string().optional(),
    users: joi.array().required(),
    messages: joi.array().required()
})