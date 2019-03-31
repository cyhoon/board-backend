import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import { TestRepo } from '../database/repository';

const getText = async (ctx: Context) => {
  const testRepo = getCustomRepository(TestRepo);

  const tests = await testRepo.find();

  ctx.status = 200;
  ctx.body = {
    code: 'SUCCESS',
    message: '성공',
    data: {
      tests,
    },
  };
};

export { getText };
