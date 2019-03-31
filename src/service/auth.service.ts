import * as Joi from 'joi';
import { getCustomRepository } from 'typeorm';

import { token, utils } from '../library';
import { UserRepo } from '../database/repository';

const validateSignIn = (body: any) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().required()
  });

  return utils.validateBody(body, schema);
};

const validateSignUp = (body: any) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  });

  return utils.validateBody(body, schema);
};

const getAuthToken = (id: string) => token.generateToken({ id });

export { validateSignIn, validateSignUp, getAuthToken };
