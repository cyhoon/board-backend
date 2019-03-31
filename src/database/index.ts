import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = process.env;

async function connectDatabase() {
  try {
    console.log(`Connecting database host: ${DATABASE_HOST}`);

    const options: ConnectionOptions = {
      type: 'mysql',
      host: DATABASE_HOST,
      port: Number(DATABASE_PORT),
      username: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [__dirname + '/entity/*{.ts,.js}'],
      timezone: 'Asia/Seoul',
      extra: { max: 2, min: 1 },
      synchronize: true,
      logging: true
    };

    await createConnection(options);

    console.log(`Success to connect database host: ${DATABASE_HOST}`);
  } catch (error) {
    throw error;
  }
}

export default connectDatabase;
