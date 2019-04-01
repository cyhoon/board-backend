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
      message: '[서버에러] 관리자에게 문의해 주섿요',
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
      message: '[서버에러] 관리자에게 문의해 주섿요',
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
    const { title, content } = ctx.request.body;

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
      message: '[서버에러] 관리자에게 문의해 주섿요',
      data: null
    };
  }
};

const updatePost = (ctx: AuthContext) => {
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
      message: '[서버에러] 관리자에게 문의해 주섿요',
      data: null
    };
  }
};

const deletePost = (ctx: AuthContext) => {
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
      message: '[서버에러] 관리자에게 문의해 주섿요',
      data: null
    };
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
