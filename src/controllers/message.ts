import Message from '../types/message';
import message from '../models/message';
import { create } from '../utils/SchemaValidation/message';
import { Request, Response, NextFunction } from 'express';
import ClientResponse from '../types/clientResponse';
import chat from '../models/chat';
import * as error from 'http-errors';

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

      const savedMessage = newMessage.save();

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

export const getMessagesByChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const chatId = req.params.id;

    const result = await chat.findById(chatId).populate({
      path: 'messages',
      select: 'sender recipient',
      populate: [
        {
          path: 'sender',
          select: 'userName email bio',
        },
        {
          path: 'recipient',
          select: 'userName email bio',
        },
      ],
    });

    if (!result || !result[0]) {
      throw error.NotFound('Messages not found');
    }

    if (result) {
      res.json(<ClientResponse>{
        message: 'Messages found',
        data: result,
        error: null,
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};
