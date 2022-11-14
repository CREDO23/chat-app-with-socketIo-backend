import Message from '../types/message';
import message from '../models/message';
import { create } from '../utils/SchemaValidation/message';
import { Request, Response, NextFunction } from 'express';
import ClientResponse from '../types/clientResponse';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: Message = await create.validateAsync(req.body);

    if (result) {
      const newMessage = new message({
        ...result,
      });

      const savedMessage = await newMessage.save();

      res.json(<ClientResponse>{
        message: 'Created successfully',
        data: savedMessage,
        error: null,
        success: true,
      });
    }
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
