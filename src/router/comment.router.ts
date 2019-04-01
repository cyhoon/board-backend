import * as Router from 'koa-router';

import { commentCtrl } from '../controller';
import { authMiddleware } from '../middlewares';

const commentRouter: Router = new Router();

commentRouter.get('/', commentCtrl.getComments);
commentRouter.post('/', authMiddleware, commentCtrl.createComment);
commentRouter.put('/:commentId', authMiddleware, commentCtrl.updateComment);
commentRouter.delete('/:commentId', authMiddleware, commentCtrl.deleteComment);

export default commentRouter;
