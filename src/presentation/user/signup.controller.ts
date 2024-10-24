import type { Response, } from 'express';
import {
  response,
  httpPost,
  controller,
  requestBody,
  Controller,
} from 'inversify-express-utils';
import { validate, } from 'class-validator';

import { inject, } from '@ioc/container';

import { NewUserDTO, } from '@user/application/dtos/new-user.dto';
import { SignupUserUseCase, } from '@user/application/usecases/signup-user';
import type { SignupUserPort, } from '@user/application/usecases/ports/signup-user.port';

@controller('/signup')
export class SignupController implements Controller {
  constructor(
    @inject(SignupUserUseCase) private readonly signupUserUseCase: SignupUserPort,
  ) {}

  @httpPost('/')
  async signup(
    @response() res: Response,
    @requestBody() user: NewUserDTO,
  ): Promise<Response> {
    const validation = await validate(user);
    if (validation.length > 0) return res
      .status(400)
      .json({
        success: false,
        error: validation.map(err => ({ ...err, })),
      });
   
    try {
      await this.signupUserUseCase.signup(user);

      return res
        .status(200)
        .json({});
    } catch (err) {
      console.log(JSON.stringify(err));
      return res
        .status(500)
        .json({
          success: false,
          message: 'Something went wrong',
        });
    }
  }
}