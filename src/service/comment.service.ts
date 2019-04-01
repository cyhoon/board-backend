import * as Joi from 'joi';
import { DeepPartial, getRepository, getCustomRepository } from 'typeorm';

import { utils } from '../library';
import { User, Post } from '../database/entity';
import { CommentRepo } from '../database/repository';

const validationCreateComment = (body: any) => {
  const schema = Joi.object().keys({
    content: Joi.string().required()
  });

  return utils.validateBody(body, schema);
};

const createComment = async (writer: User, post: Post, content: string) => {
  const commentRepo = getCustomRepository(CommentRepo);

  const newComment = commentRepo.create({
    writer,
    post,
    content
  });

  const comment = await commentRepo.save(newComment);
  comment.writer = writer;

  delete comment.post;

  return comment;
};

const existComment = async (commentId: number) => {
  const commentRepo = getCustomRepository(CommentRepo);

  const comment = await commentRepo.findOne({ id: commentId });

  if (!comment) {
    return false;
  }

  return true;
};

const checkCommentWriter = async (writerId: string, commentId: number) => {
  const commentRepo = getCustomRepository(CommentRepo);

  const comment = await commentRepo.findOne({
    where: {
      writer: writerId,
      id: commentId
    }
  });

  if (!comment) {
    return false;
  }

  return true;
};

const validationUpdateComment = (body: any) => {
  const schema = Joi.object().keys({
    content: Joi.string().required()
  });

  return utils.validateBody(body, schema);
};

const updateComment = async (writer: User, commentId: number, content: string) => {
  const commentRepo = getCustomRepository(CommentRepo);

  await commentRepo.update(commentId, { content });

  const comment = await commentRepo.findOne({ relations: ['writer'], where: { id: commentId } });
  delete comment.post;

  return comment;
};

const deleteComment = async (commentId: number) => {
  const commentRepo = getCustomRepository(CommentRepo);

  return commentRepo.delete({ id: commentId });
};

export {
  validationCreateComment,
  createComment,
  existComment,
  checkCommentWriter,
  validationUpdateComment,
  updateComment,
  deleteComment
};
