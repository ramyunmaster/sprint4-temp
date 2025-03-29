import express from 'express';
import { withAsync } from '../lib/withAsync.js';
import { getMyInfo, updateMyInfo } from '../controllers/usersController.js';
import { authenticate } from '../middlewares/auth.js';
import { updateMyPassword } from '../controllers/usersController.js';
import { getMyProducts } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/me', authenticate, withAsync(getMyInfo));
usersRouter.patch('/me', authenticate, withAsync(updateMyInfo));
usersRouter.patch('/me/password', authenticate, withAsync(updateMyPassword));
usersRouter.get('/me/products', authenticate, withAsync(getMyProducts));

export default usersRouter;
