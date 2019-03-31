import * as Router from 'koa-router';

import { commentCtrl } from '../controller';

const commentRouter: Router = new Router();

commentRouter.get('/', commentCtrl.getComments);
commentRouter.post('/', commentCtrl.createComment);
commentRouter.put('/:commentId', commentCtrl.updateComment);
commentRouter.delete('/:commentId', commentCtrl.deleteComment);

export default commentRouter;
