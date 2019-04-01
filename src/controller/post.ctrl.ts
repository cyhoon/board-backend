import { AuthContext } from '../middlewares/auth.middleware';
import { postService, userService } from '../service';

const getPosts = (ctx: AuthContext) => {
  try {
    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
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

const getPost = (ctx: AuthContext) => {
  try {
    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
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

const createPost = async (ctx: AuthContext) => {
  try {
    type BodySchema = {
      title: string;
      content: string;
    };

    // 0. 요청 파리미터 검증
    const validation = postService.validationCreatePost(ctx.request.body);

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
    const { title, content }: BodySchema = ctx.request.body;

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

    // 2. title, content, userId 를 가지고와 작성한다.
    const post = await postService.createPost(user, title, content);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        post
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

const updatePost = async (ctx: AuthContext) => {
  try {
    // 0. 요청 파리미터 검증
    type BodySchema = {
      title: string;
      content: string;
    };

    // 1. 해당 토큰에 등록되어 있는 유저 아이디로 유저 객체를 가지고 온다
    const validation = postService.validationUpdatePost(ctx.request.body);

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
    const { title, content }: BodySchema = ctx.request.body;

    // 2. 게시글이 존재하는지 확인한다.
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

    // 3. 게시글이 해당 사용자 아이디로 작성된 게시글인지 확인한다.
    const isPostWriter = await postService.checkPostWriter(userId, postId);

    if (!isPostWriter) {
      ctx.status = 403;
      ctx.body = {
        code: 'NO_POST_AUTHORITY',
        message: '게시글 수정 권한이 없습니다',
        data: null
      };
      return;
    }

    // 4. 게시글을 수정한 후 응답한다.
    const post = await postService.updatePost(userId, postId, title, content);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        post
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

const deletePost = async (ctx: AuthContext) => {
  try {
    const { id: userId } = ctx.token;
    const { postId } = ctx.params;

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

    // 1. 게시글이 해당 사용자 아이디로 작성된 게시글인지 확인한다.
    const isPostWriter = await postService.checkPostWriter(userId, postId);

    if (!isPostWriter) {
      ctx.status = 403;
      ctx.body = {
        code: 'NO_POST_AUTHORITY',
        message: '게시글 삭제 권한이 없습니다',
        data: null
      };
      return;
    }

    // 2. 게시글 삭제 ( comments 테이블에 cascde 옵션 줘서 댓글도 다 삭제됨 )
    await postService.deletePost(postId);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '게시글 삭제 성공',
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

export { getPosts, getPost, createPost, updatePost, deletePost };
