import * as express from 'express';
import {
  next,
  request,
  response,
  httpGet,
  httpPost,
  queryParam,
  requestParam,
  interfaces,
  controller,
  httpDelete,
} from 'inversify-express-utils';

@controller('/')
export class FooController implements interfaces.Controller {
  constructor() {}

  @httpGet('/')
  private index(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ): string {
    return 'hola';
  }

  @httpGet('/')
  private list(
    @queryParam('start') start: number,
    @queryParam('count') count: number
  ): string {
    return 'Hola';
  }

  @httpPost('/')
  private async create(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      res.sendStatus(201);
    } catch (err: any) {
      res.status(400).json({ error: err.messag });
    }
  }

  @httpDelete('/:id')
  private async delete(
    @requestParam('id') id: string,
    @response() res: express.Response
  ): Promise<void> {
    res.send(200);
  }
}
