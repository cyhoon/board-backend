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

export { validationCreateComment, createComment };
