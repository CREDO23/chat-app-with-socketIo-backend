"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("./models/chat");
class SocketInit {
    static instance;
    io;
    sessions = new Map();
    constructor(io) {
        this.io = io;
        this.io.on('connection', async (socket) => {
            const rooms = await chat_1.default
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
            this.sessions[socket.handshake.auth.userId] = socket.id;
            socket.on('disconnect', () => [console.log('A user disconnected')]);
        });
        SocketInit.instance = this;
    }
    static getInstance() {
        return SocketInit.instance;
    }
    newChat(chatName, chat) {
        this.io.in(chatName).emit('newChat', chat);
    }
}
exports.default = SocketInit;
//# sourceMappingURL=socket.js.map