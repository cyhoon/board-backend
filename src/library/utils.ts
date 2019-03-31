import * as Joi from 'joi';
import * as crypto from 'crypto';

const { PASSWORD_ENCRYPT_KEY } = process.env;

const encryptPassword = (plainText: string): string => {
  const hash = crypto
    .createHmac('sha512', PASSWORD_ENCRYPT_KEY)
    .update(plainText)
    .digest('hex');

  return hash;
};

const validateBody = (body: any, schema: Joi.SchemaLike) => {
  const validation = Joi.validate(body, schema);

  if (validation.error) {
    return false;
  }

  return true;
};

export { encryptPassword, validateBody };
