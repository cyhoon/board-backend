import * as Joi from 'joi';
import { getCustomRepository, DeepPartial } from 'typeorm';

import { token, utils } from '../library';
import { PostRepo, CommentRepo, UserRepo } from '../database/repository';
import { User } from '../database/entity';

const validationCreatePost = (body: any) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required()
  });

  return utils.validateBody(body, schema);
};

const createPost = async (writer: DeepPartial<User>, title: string, content: string) => {
  const postRepo = getCustomRepository(PostRepo);

  const newPost = postRepo.create({
    writer,
    title,
    content
  });

  const post = await postRepo.save(newPost);
  post.comments = [];

  return post;
};

const existPost = async (postId: string) => {
  const postRepo = getCustomRepository(PostRepo);

  const post = await postRepo.findOne({ id: postId });

  if (!post) {
    return false;
  }

  return true;
};

const checkPostWriter = async (writerId: string, postId: string) => {
  const postRepo = getCustomRepository(PostRepo);

  const post = await postRepo.findOne({ where: { writer: writerId, id: postId } });

  if (!post) {
    return false;
  }

  return true;
};

const validationUpdatePost = (body: any) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required()
  });

  return utils.validateBody(body, schema);
};

const updatePost = async (writerId: string, postId: string, title: string, content: string) => {
  const userRepo = getCustomRepository(UserRepo);
  const postRepo = getCustomRepository(PostRepo);
  const commentRepo = getCustomRepository(CommentRepo);

  const writer = await userRepo.findOne({ where: { id: writerId } });

  // 0. 게시글을 업데이트 한다
  await postRepo.update(postId, { title, content, writer });

  // 1. 댓글을 가지고 온다.
  const post = await postRepo.findOne({ relations: ['writer'], where: { id: postId } });

  post.comments = await commentRepo.find({
    relations: ['writer'],
    where: { post: postId },
    order: {
      writeDate: 'DESC'
    },
    skip: 0,
    take: 5
  });

  return post;
};

const deletePost = async (postId: string) => {
  const postRepo = getCustomRepository(PostRepo);

  return postRepo.delete({ id: postId });
};

const getPostById = async (postId: string) => {
  const postRepo = getCustomRepository(PostRepo);
  const commentRepo = getCustomRepository(CommentRepo);

  // 0. 게시글을 가지고온다.
  const post = await postRepo.findOne({ relations: ['writer'], where: { id: postId } });

  // 1. 댓글 정보를 가지고 온다.
  post.comments = await commentRepo.find({
    relations: ['writer'],
    where: { post: postId },
    order: {
      writeDate: 'DESC'
    },
    skip: 0,
    take: 5
  });

  return post;
};

export {
  validationCreatePost,
  createPost,
  existPost,
  checkPostWriter,
  validationUpdatePost,
  updatePost,
  deletePost,
  getPostById
};
