import * as express from 'express';
import * as messageControllers from '../controllers/message';

const router = express.Router();

router.post('/', messageControllers.createMessage);

router.get('/:id', messageControllers.getMessagesByChat);

export default router;
