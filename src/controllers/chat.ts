import Chat from '../types/chat';
import chat from '../models/chat';
import { Response, Request, NextFunction } from 'express';
import * as error from 'http-errors';
import { create } from '../utils/SchemaValidation/chat';
import ClientResponse from '../types/clientResponse';
import mongoose from 'mongoose';

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: Chat = await create.validateAsync(req.body);

    if (result) {
      const newChat = new chat({
        ...result,
      });

      const savedChat = await newChat.save();

      res.json(<ClientResponse>{
        message: 'Created successfully',
        data: savedChat,
        error: null,
        success: true,
      });
    }
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

export const getChatByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.chatId;
    if(mongoose.isValidObjectId(userId)){
      const result: Chat[] = await chat.find({ users: { $in: [`${userId}`] } }).populate({
        path: 'messages',
        select : 'sender recipient content updatedAt',
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
        throw error.NotFound('Chats not found')
      }
  
      if(result){
          res.json(<ClientResponse>{
              message: 'Chat found',
              data: result,
              error: null,
              success: true,
            });
      }
    }else{
      throw error.NotFound('Invalid ID')
    }

    
  } catch (error) {
    next(error);
  }
};

