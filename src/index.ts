require('dotenv').config();

const { PORT } = process.env;

import Server from './server';
import { logger } from './library';

try {
  const server = new Server();
  server.start(PORT);
} catch (error) {
  logger.error('SERVER ERROR');
  logger.info(`Error message: ${error.message}`);
}
