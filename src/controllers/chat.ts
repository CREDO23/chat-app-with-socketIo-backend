import Chat from '../types/chat';
import chat from '../models/chat';
import message from '../models/message';
import { Response, Request, NextFunction } from 'express';
import * as error from 'http-errors';
import { create, pushMessage } from '../utils/SchemaValidation/chat';
import ClientResponse from '../types/clientResponse';
import mongoose from 'mongoose';
import SocketInit from '../socket';



export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await create.validateAsync(req.body);

    const socket = SocketInit.getInstance();

    if (result) {
      const newMessage = new message({
        ...req.body.message,
      });

      const savedMessage = await newMessage.save();

      if (savedMessage) {
        const newChat = new chat({
          ...result,
          messages: [savedMessage.id.toString()],
        });

        const savedChat = await (
          await (
            await newChat.save()
          ).populate({
            path: 'messages',
            select: 'sender recipient content updatedAt',
            options: { sort: { updatedAt: 1 } },
            populate: [
              {
                path: 'sender',
                select: 'userName',
              },
              {
                path: 'recipient',
                select: 'userName name',
              },
            ],
          })
        ).populate({
          path: 'users',
          select: 'userName avatar',
        });

        socket.newChat(savedChat.name, savedChat);

        res.json(<ClientResponse>{
          message: 'Created successfully',
          data: savedChat,
          error: null,
          success: true,
        });
      }
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
    const userId = req.params.userId;
    if (mongoose.isValidObjectId(userId)) {
      const result: Chat[] = await chat
        .find({ users: { $in: [`${userId}`] } })
        .populate({
          path: 'messages',
          select: 'sender recipient content updatedAt',
          options: { sort: { updatedAt: 1 } },
          populate: [
            {
              path: 'sender',
              select: 'userName',
            },
            {
              path: 'recipient',
              select: 'userName name',
            },
          ],
        })
        .populate({
          path: 'users',
          select: 'userName avatar',
        })
        .sort({ updatedAt: -1 });

      if (result) {
        res.json(<ClientResponse>{
          message: 'Chat found',
          data: result,
          error: null,
          success: true,
        });
      }
    } else {
      throw error.NotFound('Invalid ID');
    }
  } catch (error) {
    next(error);
  }
};

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const socket = SocketInit.getInstance();

    const chatId = req.params.chatId;

    const result = await pushMessage.validateAsync(req.body);

    const newMessage = new message({
      ...result,
    });

    const savedMessage = await newMessage.save();

    if (savedMessage) {
      const updatedChat = await chat
        .findByIdAndUpdate(
          chatId,
          {
            $push: { messages: savedMessage.id },
          },
          { new: true },
        )
        .populate({
          path: 'messages',
          select: 'sender recipient content updatedAt',
          options: { sort: { updatedAt: 1 } },
          populate: [
            {
              path: 'sender',
              select: 'userName',
            },
            {
              path: 'recipient',
              select: 'userName name',
            },
          ],
        })
        .populate({
          path: 'users',
          select: 'userName avatar',
        });

      socket.newChat(updatedChat.name, updatedChat);

      res.json(<ClientResponse>{
        message: 'Message added successfully',
        data: updatedChat,
        error: null,
        success: true,
      });
    } else {
      throw error.InternalServerError('Somethings went wrong');
    }
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

// export const updateLastViewChat = async (req : Request, res : Response , next : NextFunction) : Promise<void> => {
//   try {

//       const chatId = req.params.chatId

//       const result = await updateLastView.validateAsync(req.body)

//       if(result){
//         const user = result.userName

//         const lastview = result.lastView

//         const updatedChat = await chat.findByIdAndUpdate(chatId , {$set : {lastviews[user] : lastview}})
//       }

//   } catch (error) {
//     next(error)
//   }
// }
