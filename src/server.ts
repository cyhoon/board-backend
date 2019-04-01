import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser';
import * as Cors from 'kcors';
import { ApolloServer } from 'apollo-server-koa';

import rootRouter from './router';
import connectDatabase from './database';
import schema from './graphql/schema';

import { logger } from './library';

class Server {
  private app: Koa;
  private router: Router;
  private apolloServer: ApolloServer;

  constructor() {
    this.app = new Koa();
    this.router = new Router();

    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares() {
    this.app.use(Cors());
    this.app.use(BodyParser());
  }

  private setRoutes() {
    this.router.use('/api', rootRouter.routes());

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  private setApolloServer() {
    this.apolloServer = new ApolloServer({ schema });
    this.apolloServer.applyMiddleware({ app: this.app });
  }

  public async start(port: string = '4000'): Promise<void> {
    await connectDatabase();

    this.setApolloServer();
    this.app.listen(port);

    logger.info(`Server application is up and running on port ${port}`);
    logger.info(`GraphQL API Server application is up and running on port ${port}`);
  }
}

export default Server;
