require('dotenv').config();

const { PORT } = process.env;

import Server from './server';

try {
  const server = new Server();
  server.start(PORT);
} catch (error) {
  console.error('SERVER ERROR');
  console.log(`Error message: ${error.message}`);
}
