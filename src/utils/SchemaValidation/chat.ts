import * as joi from '@hapi/joi'

export const create = joi.object({
    isPrivate: joi.boolean().optional(),
    admin: joi.string().optional(),
    name: joi.string().optional(),
    avatar: joi.string().optional(),
    users: joi.array().required(),
    message: joi.object({
        sender : joi.string().required(),
        recipient : joi.string().required(),
        content : joi.string().required()
    })
})

export const update = joi.object({
        sender : joi.string().required(),
        recipient : joi.string().required(),
        content : joi.string().required()
})