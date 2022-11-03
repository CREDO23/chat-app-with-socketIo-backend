import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as morgan from 'morgan';
import connectDB from './configs/database'

dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 4400;

connectDB(process.env.DB_URI)

app.use(cors());
app.use(morgan(':method :url : statuts :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Server is running ',
  });
});

app.use((req: express.Request, res: express.Response) => {
  res.json({
    message: 'URL not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
