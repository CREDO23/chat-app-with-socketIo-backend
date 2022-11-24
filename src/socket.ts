import { Server, Socket } from 'socket.io';
import chat from './models/chat';

export default class SocketInit {
  private static instance: SocketInit;

  io: Server;

  sessions: Map<string, string> = new Map();

  constructor(io: Server) {
    this.io = io;
    this.io.on('connection', async (socket: Socket) => {
      this.sessions[socket.handshake.auth.userId] = socket.id;

      io.to(socket.id).emit('user_connected');

      const rooms = await chat
        .find({ users: { $in: [`${socket.handshake.auth.userId}`] } })
        .select({
          name: 1,
          _id: 0,
        });

      socket.on('join_users', (users, chatName) => {
        Object.keys(this.sessions).forEach((user) => {
          if (users.some((userId) => new String(userId) == user)) {
            io.to(this.sessions[user]).emit('ask_to_join', chatName);
          }
        });
      });

      socket.on('join_chat', (chatName) => {
        socket.join(chatName);
      });

      rooms.forEach((room) => socket.join(room.name));

      socket.on('disconnect', () => [console.log('A user disconnected')]);
    });
    SocketInit.instance = this;
  }

  public static getInstance() {
    return SocketInit.instance;
  }

  public newChat(chatName: string, chat) {
    this.io.in(chatName).emit('newChat', chat);
  }
}
