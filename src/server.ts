import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser';
import * as Cors from 'kcors';

import rootRouter from './router';
import connectDatabase from './database';

class Server {
  private app: Koa;
  private router: Router;

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

  public async start(port: string = '4000'): Promise<void> {
    await connectDatabase();
    this.app.listen(port);

    console.log(`Server application is up and running on port ${port}`);
  }
}

export default Server;
