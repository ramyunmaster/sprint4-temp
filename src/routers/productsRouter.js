import express from 'express';
import { withAsync } from '../lib/withAsync.js';
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductList,
  createComment,
  getCommentList,
} from '../controllers/productsController.js';
import { authenticate } from '../middlewares/auth.js';

const productsRouter = express.Router();

productsRouter.post('/', authenticate, withAsync(createProduct));
productsRouter.get('/:id', withAsync(getProduct));
productsRouter.patch('/:id', authenticate, withAsync(updateProduct));
productsRouter.delete('/:id', authenticate, withAsync(deleteProduct));
productsRouter.get('/', withAsync(getProductList));
productsRouter.post('/:id/comments', authenticate, withAsync(createComment));
productsRouter.get('/:id/comments', withAsync(getCommentList));


export default productsRouter;
