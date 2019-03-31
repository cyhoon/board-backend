import { Context } from 'koa';

const getUser = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const getPosts = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const getComments = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

export { getUser, getPosts, getComments };
