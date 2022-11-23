"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const database_1 = require("./configs/database");
const createError = require("http-errors");
const user_1 = require("./routes/user");
const chat_1 = require("./routes/chat");
const message_1 = require("./routes/message");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket");
dotenv.config();
const app = express();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
//connexxion with
new socket_1.default(io);
const PORT = process.env.PORT || 4400;
(0, database_1.default)(process.env.DB_URI);
app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running ',
    });
});
app.use('/api/users', user_1.default);
app.use('/api/chats', chat_1.default);
app.use('/api/messages', message_1.default);
app.use((req, res, next) => {
    next(createError.NotFound('URL not found'));
});
app.use((
// eslint-disable-next-line @typescript-eslint/no-explicit-any
error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message || 'Internal Server Error',
        data: null,
        error: error,
        success: false,
    });
});
server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
//# sourceMappingURL=index.js.map