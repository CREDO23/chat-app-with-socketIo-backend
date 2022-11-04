import * as express from 'express';
import * as userControllers from '../controllers/user';

const router: express.IRouter = express.Router();

router.post('/register', userControllers.register);

router.get('/', userControllers.getAllusers)

router.get('/:id', userControllers.getUser)

router.put('/update/:id', userControllers.updateUser)

router.delete('/delete/:id', userControllers.deleteUser)

export default router;

