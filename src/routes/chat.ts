import * as express from 'express';
import * as chatControllers from '../controllers/chat';

const router = express.Router();

router.post('/', chatControllers.createChat);

router.get('/:chatId', chatControllers.getChatByUser);

export default router;
