import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as morgan from 'morgan';
import connectDB from './configs/database';
import ClientResponse from './types/clientResponse';
import * as createError from 'http-errors';
import userRouters from './routes/user'
import chatRoutes from './routes/chat'
import messageRoutes from './routes/message'
import {createServer} from 'http'
import {Server} from 'socket.io'
import SocketInit from './socket'

dotenv.config();

const app: express.Application = express();
const server = createServer(app)

const io = new Server(server , {
    cors: {
            origin: '*',
    },
    pingTimeout : 90000
})

//connexxion with
new SocketInit(io)



const PORT = process.env.PORT || 4400;

connectDB(process.env.DB_URI);

app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Server is running ',
  });
});

app.use('/api/users' , userRouters)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)



app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError.NotFound('URL not found'));
  },
);


app.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
  ) => {
    res.status(error.status || 500)
    res.json(<ClientResponse>{
      message: error.message || 'Internal Server Error',
      data: null,
      error: error,
      success: false,
    });
  },
);



server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
