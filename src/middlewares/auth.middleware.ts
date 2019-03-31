import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';

import { token } from '../library';

interface AuthContext extends Context {
  token?: {
    userEmail: string;
    nickName: string;
    iat: Date;
    exp: Date;
    iss: string;
    sub: string;
  };
}

const authMiddleware = async (ctx: AuthContext, next: () => Promise<any>) => {
  try {
    const token = ctx.headers['class101-token'];

    const decodeToken = await token.verifyToken(token);

    if (decodeToken.sub !== 'authToken') throw 'Not a auth token';
    ctx.token = decodeToken;
    await next();
  } catch (error) {
    ctx.status = 403;
    ctx.body = {
      code: 'FORBIDDEN',
      message: '인증 실패',
      data: null
    };
  }
};

export default authMiddleware;
