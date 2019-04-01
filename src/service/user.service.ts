import { getCustomRepository } from 'typeorm';

import { UserRepo, PostRepo, CommentRepo } from '../database/repository';
import { utils } from '../library';

const isExistedUserId = async (id: string) => {
  const userRepo = getCustomRepository(UserRepo);

  const user = await userRepo.findOne({ where: { id } });

  if (!user) {
    return false;
  }

  return true;
};

const createUser = async (id: string, password: string, name: string) => {
  const userRepo = getCustomRepository(UserRepo);

  const newUser = userRepo.create({
    id,
    name,
    password: utils.encryptPassword(password)
  });

  return userRepo.save(newUser);
};

const getUserByIdAndPassword = async (id: string, password: string) => {
  const userRepo = getCustomRepository(UserRepo);

  return userRepo.findOne({
    select: ['id', 'name', 'joinDate'],
    where: { id, password: utils.encryptPassword(password) }
  });
};

const getUserById = async (id: string) => {
  const userRepo = getCustomRepository(UserRepo);

  return userRepo.findOne({
    select: ['id', 'name', 'joinDate'],
    where: { id }
  });
};

const getPosts = async (userId: string, offset: number, limit: number) => {
  const postRepo = getCustomRepository(PostRepo);
  const commentRepo = getCustomRepository(CommentRepo);

  const foundPosts = await postRepo.find({
    relations: ['writer'],
    order: {
      writeDate: 'DESC'
    },
    where: { writer: userId },
    skip: offset,
    take: limit
  });

  const posts = await Promise.all(
    foundPosts.map(async post => {
      const commentCount = await commentRepo.count({ where: { post: post.id } });
      return {
        ...post,
        commentCount
      };
    })
  );

  return posts;
};

export { isExistedUserId, createUser, getUserByIdAndPassword, getUserById, getPosts };
