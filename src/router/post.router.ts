import * as Router from 'koa-router';
import { postCtrl } from '../controller';
import commentRouter from './comment.router';

const postRouter: Router = new Router();

postRouter.get('/', postCtrl.getPosts);
postRouter.get('/:postId', postCtrl.getPost);
postRouter.post('/', postCtrl.createPost);
postRouter.put('/:postId', postCtrl.updatePost);
postRouter.delete('/:postId', postCtrl.deletePost);

/*
  댓글 API
  - 댓글 조회 API ( 페이지네이션 고려 ) : GET : /posts/:postId/comments
  - 댓글 등록 API : POST : /posts/:postId/comments
  - 댓글 수정 API : PUT : /posts/:postId/comments/:commentId
  - 댓글 삭제 API : DELETE : /posts/:postId/comments/:commentId
*/
postRouter.use('/:postId/comments', commentRouter.routes());

export default postRouter;
