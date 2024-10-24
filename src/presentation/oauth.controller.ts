import type { Response, } from 'express';
import {
  response,
  httpPost,
  controller,
  Controller,
  requestBody,
} from 'inversify-express-utils';

import { inject, } from '@ioc/container';

import { AuthorizeUseCase } from '@oauth/application/authorize.usecase';
import type { AuthorizePort, } from '@oauth/application/ports/authorize.port';

@controller('/oauth')
export class OAuthController implements Controller {
  constructor(
    @inject(AuthorizeUseCase) private readonly authorizeUseCase: AuthorizePort,
  ) {}

  @httpPost('/exchange_code')
  async exchangeCode(
    @response() res: Response,
    @requestBody() credentials: Record<string, any>,
  ): Promise<Response> {
    const { code, } = credentials;

    // TODO: save token in DB and generate proper backend jwt.
    const data = await this.authorizeUseCase.exchangeAuthorizationCode(code);
    if (!data) return res
      .status(403)
      .json({})

    return res
      .status(201)
      .json(data);
  }

  @httpPost('/refresh_token')
  async refreshToken(
    @response() res: Response,
    @requestBody() credentials: any,
  ): Promise<any> {
    // TODO: setup refresh token
  }
}