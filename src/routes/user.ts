import * as express from 'express';
import * as userControllers from '../controllers/user';

const router: express.IRouter = express.Router();

router.post('/singup', userControllers.register);

router.post('/singin', userControllers.login);

router.get('/', userControllers.getAllusers);

router.get('/:id', userControllers.getUser);

router.put('/:id', userControllers.updateUser);

router.put('/:id', userControllers.updatePassword);

router.delete('/:id', userControllers.deleteUser);

export default router;
