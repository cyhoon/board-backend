import { Context } from 'koa';

const getComments = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const createComment = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const updateComment = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const deleteComment = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

export { getComments, createComment, updateComment, deleteComment };
