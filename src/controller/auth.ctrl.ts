import { Context } from 'koa';
import { authService, userService } from '../service';

const signIn = async (ctx: Context) => {
  try {
    type BodySchema = {
      id: string;
      password: string;
    };

    // 0. 요청 파라미터 검증
    const signInValidation = authService.validateSignIn(ctx.request.body);

    if (!signInValidation) {
      ctx.status = 400;
      ctx.body = {
        code: 'WRONG_SCHEMA',
        message: '요청 파라미터 에러',
        data: null
      };
      return;
    }

    const { id, password }: BodySchema = ctx.request.body;

    // 1. 아이디와 비밀번호로 계정 조회
    const user = await userService.getUser(id, password);

    if (!user) {
      ctx.status = 401;
      ctx.body = {
        code: 'UNAUTHORIZED',
        message: '사용자 정보가 조회되지 않습니다.',
        data: null
      };
      return;
    }

    // 2. 토큰 발행 후 응답
    const authToken = await authService.getAuthToken(user.id);

    ctx.sttaus = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        user,
        token: {
          authToken
        }
      }
    };
  } catch (error) {
    ctx.sttaus = 500;
    ctx.body = {
      code: 'SERVER_ERROR',
      message: '[서버에러] 관리자에게 문의해 주섿요',
      data: null
    };
  }
};

const signUp = async (ctx: Context) => {
  try {
    type BodySchema = {
      id: string;
      password: string;
      name: string;
    };

    // 0. 요청 파라미터 검증
    const signUpValidation = authService.validateSignUp(ctx.request.body);

    if (!signUpValidation) {
      ctx.status = 400;
      ctx.body = {
        code: 'WRONG_SCHEMA',
        message: '요청 파라미터 에러',
        data: null
      };
      return;
    }

    const { id, password, name }: BodySchema = ctx.request.body;

    // 1. 아이디가 이미 있는지 검사
    const userIdExists = await userService.isExistedUserId(id);

    // 2. 중복된 값이 있다면 중복되었다고 응답
    if (userIdExists) {
      ctx.status = 409;
      ctx.body = {
        code: 'DUPLICATED_USER_ID',
        message: '사용자 아이디가 이미 존재합니다',
        data: null
      };
      return;
    }

    // 3. DB user 테이블에 데이터를 등록
    const user = await userService.createUser(id, password, name);
    delete user.password;

    // 4. 토큰을 발행한 후 응답
    const authToken = await authService.getAuthToken(user.id);

    ctx.sttaus = 200;
    ctx.body = {
      code: 'SUCCESS',
      message: '성공',
      data: {
        user,
        token: {
          authToken
        }
      }
    };
  } catch (error) {
    ctx.sttaus = 500;
    ctx.body = {
      code: 'SERVER_ERROR',
      message: '[서버에러] 관리자에게 문의해 주섿요',
      data: null
    };
  }
};

export { signIn, signUp };
