import { Context } from 'koa';

const getPosts = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const getPost = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const createPost = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const updatePost = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

const deletePost = (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {}
  };
};

export { getPosts, getPost, createPost, updatePost, deletePost };
