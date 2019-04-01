import { getCustomRepository } from 'typeorm';

import { UserRepo } from '../database/repository';
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

export { isExistedUserId, createUser, getUserByIdAndPassword, getUserById };
