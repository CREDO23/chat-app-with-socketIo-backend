import * as express from 'express';
import { resetpassword } from '../controllers/resetpassword';

const router = express.Router();

router.post('/', resetpassword);

export default router;
