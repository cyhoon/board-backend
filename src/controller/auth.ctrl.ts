import { Context } from 'koa';

const signIn = (ctx: Context) => {
  ctx.sttaus = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const signUp = (ctx: Context) => {
  ctx.sttaus = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

export { signIn, signUp };
