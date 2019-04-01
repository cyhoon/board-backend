import { Context } from 'koa';
import { userService } from '../service';

const getUser = async (ctx: Context) => {
  try {
    // 0. 사용자 아이디를 params에서 가지고온다
    const { userId } = ctx.params;

    // 1. 해당 사용자 아이디를 DB에서 가지고 온다.
    const user = await userService.getUserById(userId);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        user
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

const getPosts = async (ctx: Context) => {
  try {
    // 0. 사용자 아이디를 params에서 가지고온다
    const { userId } = ctx.params;

    // 1. 해당 사용자 아이디를 DB에서 가지고 온다.
    const user = await userService.getUserById(userId);

    // 2. 사용자가 작성한 글들을 가지고 온다.
    const posts = await userService.getPosts(userId);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        user,
        posts
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

const getComments = async (ctx: Context) => {
  try {
    // 0. 사용자 아이디를 params에서 가지고온다
    const { userId } = ctx.params;

    // 1. 해당 사용자 아이디를 DB에서 가지고 온다.
    const user = await userService.getUserById(userId);

    // 2. 사용자가 작성한 글들을 가지고 온다.
    const comments = await userService.getComments(userId);

    ctx.status = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        user,
        comments
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

export { getUser, getPosts, getComments };
