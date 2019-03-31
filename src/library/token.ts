import * as jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY: secret } = process.env;

type PayloadType = {
  id: string;
};

export const generateToken = async (payload: PayloadType) => {
  try {
    return await jwt.sign(payload, secret, {
      issuer: 'class101',
      expiresIn: '7d',
      subject: 'authToken'
    });
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    return await jwt.verify(token, secret);
  } catch (error) {
    throw error;
  }
};
