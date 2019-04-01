import { Context } from 'koa';

import { token } from '../library';

export interface AuthContext extends Context {
  token?: {
    id: string;
    iat: Date;
    exp: Date;
    iss: string;
    sub: string;
  };
}

const authMiddleware = async (ctx: AuthContext, next: () => Promise<any>) => {
  try {
    const authToken = ctx.headers['class101-token'];

    const decodeToken: any = await token.verifyToken(authToken);

    if (decodeToken.sub !== 'authToken') throw 'Not a auth token';
    ctx.token = decodeToken;

    await next();
  } catch (error) {
    console.log('error: ', error);
    ctx.status = 403;
    ctx.body = {
      code: 'FORBIDDEN',
      message: '인증 실패',
      data: null
    };
  }
};

export default authMiddleware;
