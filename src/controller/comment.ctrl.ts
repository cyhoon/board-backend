import { Context } from 'koa';

import { AuthContext } from '../middlewares/auth.middleware';
import { commentService, userService, postService } from '../service';
import { Post } from '../database/entity';

const getComments = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const createComment = async (ctx: AuthContext) => {
  try {
    type BodySchema = {
      content: string;
    };

    // 0. 요청 파라미터 검증
    const validation = commentService.validationCreateComment(ctx.request.body);

    if (!validation) {
      ctx.status = 400;
      ctx.body = {
        code: 'WRONG_SCHEMA',
        message: '요청 파라미터 에러',
        data: null
      };
      return;
    }

    const { id: userId } = ctx.token;
    const { postId } = ctx.params;
    const { content }: BodySchema = ctx.request.body;

    // 1. 해당 토큰에 등록되어 있는 유저 아이디로 유저 객체를 가지고 온다
    const user = await userService.getUserById(userId);

    if (!user) {
      ctx.status = 401;
      ctx.body = {
        code: 'UNAUTHORIZED',
        message: '사용자 정보가 조회되지 않습니다.',
        data: null
      };
      return;
    }

    // 2. 게시글 존재 확인
    const post = await postService.getPostById(postId);

    if (!post) {
      ctx.status = 404;
      ctx.body = {
        code: 'NOT_FOUND_POST',
        message: '게시글을 찾을 수 없습니다',
        data: null
      };
      return;
    }

    // 4. 댓글 테이블에 데이터 등록 후 응답
    const comment = await commentService.createComment(user, post, content);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        comment
      }
    };
  } catch (error) {
    ctx.sttaus = 500;
    ctx.body = {
      code: 'SERVER_ERROR',
      message: '[서버에러] 관리자에게 문의해 주세요',
      data: null
    };
  }
};

const updateComment = async (ctx: Context) => {
  try {
    type BodySchema = {
      content: string;
    };

    // 0. 요청 파라미터 검증
    const validation = commentService.validationUpdateComment(ctx.request.body);

    if (!validation) {
      ctx.status = 400;
      ctx.body = {
        code: 'WRONG_SCHEMA',
        message: '요청 파라미터 에러',
        data: null
      };
      return;
    }

    const { id: userId } = ctx.token;
    const { postId, commentId } = ctx.params;
    const { content }: BodySchema = ctx.request.body;

    // 1. 해당 토큰에 등록되어 있는 유저 아이디로 유저 객체를 가지고 온다
    const user = await userService.getUserById(userId);

    if (!user) {
      ctx.status = 401;
      ctx.body = {
        code: 'UNAUTHORIZED',
        message: '사용자 정보가 조회되지 않습니다.',
        data: null
      };
      return;
    }

    // 2. 게시글 존재 확인
    const postExists = await postService.existPost(postId);

    if (!postExists) {
      ctx.status = 404;
      ctx.body = {
        code: 'NOT_FOUND_POST',
        message: '게시글을 찾을 수 없습니다',
        data: null
      };
      return;
    }

    // 3. 댓글 존재 확인
    const commentExists = await commentService.existComment(commentId);

    if (!commentExists) {
      ctx.status = 404;
      ctx.body = {
        code: 'NOT_FOUND_COMMENT',
        message: '댓글을 찾을 수 없습니다',
        data: null
      };
      return;
    }

    // 4. 댓글 작성자인지 확인
    const isCommentWriter = await commentService.checkCommentWriter(userId, commentId);

    if (!isCommentWriter) {
      ctx.status = 403;
      ctx.body = {
        code: 'NO_COMMENT_AUTHORITY',
        message: '댓글 수정 권한이 없습니다',
        data: null
      };
      return;
    }

    // 5. 댓글 업데이트 후 응답
    const comment = await commentService.updateComment(user, commentId, content);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        comment
      }
    };
  } catch (error) {
    ctx.sttaus = 500;
    ctx.body = {
      code: 'SERVER_ERROR',
      message: '[서버에러] 관리자에게 문의해 주세요',
      data: null
    };
  }
};

const deleteComment = async (ctx: Context) => {
  try {
    const { id: userId } = ctx.token;
    const { postId, commentId } = ctx.params;

    // 0. 게시글이 존재하는지 확인한다.
    const postExists = await postService.existPost(postId);

    if (!postExists) {
      ctx.status = 404;
      ctx.body = {
        code: 'NOT_FOUND_POST',
        message: '게시글을 찾을 수 없습니다',
        data: null
      };
      return;
    }

    // 1. 댓글 존재 확인
    const commentExists = await commentService.existComment(commentId);

    if (!commentExists) {
      ctx.status = 404;
      ctx.body = {
        code: 'NOT_FOUND_COMMENT',
        message: '댓글을 찾을 수 없습니다',
        data: null
      };
      return;
    }

    // 2. 댓글 작성자인지 확인
    const isCommentWriter = await commentService.checkCommentWriter(userId, commentId);

    if (!isCommentWriter) {
      ctx.status = 403;
      ctx.body = {
        code: 'NO_COMMENT_AUTHORITY',
        message: '댓글 삭제 권한이 없습니다',
        data: null
      };
      return;
    }

    // 3. 댓글 삭제
    await commentService.deleteComment(commentId);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '댓글 삭제 성공',
      data: null
    };
  } catch (error) {
    ctx.sttaus = 500;
    ctx.body = {
      code: 'SERVER_ERROR',
      message: '[서버에러] 관리자에게 문의해 주세요',
      data: null
    };
  }
};

export { getComments, createComment, updateComment, deleteComment };
