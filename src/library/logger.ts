import * as pino from 'pino';

export default pino({
  safe: true,
  prettyPrint: true,
  name: 'Board-Backend'
});
