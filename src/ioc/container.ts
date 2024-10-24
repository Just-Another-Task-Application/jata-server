import { Container, } from 'inversify';
import { buildProviderModule, } from 'inversify-binding-decorators';

import {
  type Injectable,
  type InjectableType,
  type InjectableScope,
  singleton,
  registerDependencies,
} from './core';

import '@presentation/api.controller';
import '@presentation/oauth.controller';
import '@presentation/user/signup.controller';

import dependencies from './dependencies';

const container = new Container({
  defaultScope: 'Singleton',
});

registerDependencies(container, dependencies);

container.load(buildProviderModule());

export default container;

export {
  Injectable,
  InjectableType,
  InjectableScope,
  singleton,
};
export * from 'inversify';