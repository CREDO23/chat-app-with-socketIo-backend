import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as morgan from 'morgan';
import connectDB from './configs/database';
import ClientResponse from './types/clientResponse';
import * as createError from 'http-errors';
import userControllers from './routes/user'

dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 4400;

connectDB(process.env.DB_URI);

app.use(cors());
app.use(morgan(':method :url : statuts :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Server is running ',
  });
});

app.use('/api/users' , userControllers)

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

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
