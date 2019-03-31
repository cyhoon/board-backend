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

export { isExistedUserId, createUser };
