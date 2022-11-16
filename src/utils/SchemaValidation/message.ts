import * as joi from '@hapi/joi'

export const create = joi.object({
    sender : joi.string().required(),
    recipient : joi.string().optional(),
    content : joi.string().required(),
})