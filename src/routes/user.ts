import * as express from 'express';
import * as userControllers from '../controllers/user';

const router: express.IRouter = express.Router();

router.post('/register', userControllers.register);

export default router;
