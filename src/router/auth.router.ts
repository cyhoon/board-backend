import * as Router from 'koa-router';
import { authCtrl } from '../controller';

const authRouter: Router = new Router();

authRouter.post('/signin', authCtrl.signIn);
authRouter.post('/signup', authCtrl.signUp);

export default authRouter;
