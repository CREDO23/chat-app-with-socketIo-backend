import * as express from 'express';
import * as chatControllers from '../controllers/chat';

const router = express.Router();

router.post('/', chatControllers.createChat);

router.get('/:userId', chatControllers.getChatByUser);

export default router;
