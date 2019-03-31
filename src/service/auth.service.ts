import * as Joi from 'joi';

import { token, utils } from '../library';

const validateSignUp = (body: any) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  });

  return utils.validateBody(body, schema);
};

const getAuthToken = (id: string) => token.generateToken({ id });

export { validateSignUp, getAuthToken };
