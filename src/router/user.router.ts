import * as Router from 'koa-router';

import { userCtrl } from '../controller';

const userRouter: Router = new Router();

userRouter.get('/:userId', userCtrl.getUser);
userRouter.get('/:userId/posts', userCtrl.getPosts);
userRouter.get('/:userId/comments', userCtrl.getComments);

export default userRouter;
