import * as Router from 'koa-router';
import { Context } from 'koa';
import authRouter from './auth.router';
import userRouter from './user.router';
import postRouter from './post.router';

const rootRouter: Router = new Router();

/*
  인증 API
  - 로그인 API : POST : /auth/signin
  - 회원가입 API : POST : /auth/signup
*/
rootRouter.use('/auth', authRouter.routes());

/*
  유저 API
  - 유저 프로필 조회 API : GET : /users/:userId
  - 유저 게시글 조회 API : GET : /users/:userId/posts
  - 유저 댓글 조회 API : GET : /users/:userId/comments
*/
rootRouter.use('/users', userRouter.routes());

/**
  게시글 API
  - 글 조회 API ( 댓글 조회 및 페이지네이션 고려 ) : GET : /posts
  - 글 상세보기 API : POST : /posts/:postId
  - 글 등록 API : POST : /posts
  - 글 수정 API : PUT : /posts/:postId
  - 글 삭제 API : DELETE : /posts/:postId
 */
rootRouter.use('/posts', postRouter.routes());

rootRouter.all('*', (ctx: Context) => {
  ctx.status = 404;
  ctx.body = '존재하지 않는 API 입니다';
});

export default rootRouter;
