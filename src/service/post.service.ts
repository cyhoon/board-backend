import * as Joi from 'joi';
import { getCustomRepository, DeepPartial } from 'typeorm';

import { token, utils } from '../library';
import { PostRepo } from '../database/repository';
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

export { validationCreatePost, createPost };
