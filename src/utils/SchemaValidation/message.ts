import * as joi from '@hapi/joi'

export const create = joi.object({
    sender : joi.string().required(),
    recipient : joi.string().required(),
    chat : joi.string().optional(),
    content : joi.string().required(),
    isRead : joi.boolean().default(false)
})