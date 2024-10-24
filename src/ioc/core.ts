import { Container, interfaces, } from 'inversify';
import { fluentProvide, } from 'inversify-binding-decorators';

export type InjectableScope = interfaces.BindingScope;

export type InjectableType = interfaces.BindingType;

export type Injectable<T = any> = {
  token: interfaces.ServiceIdentifier<T>;
  provider: any;
  type: InjectableType;
  scope?: InjectableScope;
};

function defineDependencyScope<T>(
  container: Container,
  dependency: Injectable<T>,
): void {
  const { scope, } = dependency;

  scope === 'Request'
    ? container
      .bind(dependency.token)
      .to(dependency.provider)
      .inRequestScope()
    : scope === 'Transient'
    ? container
      .bind(dependency.token)
      .to(dependency.provider)
      .inTransientScope()
    : container
      .bind(dependency.token)
      .to(dependency.provider)
      .inSingletonScope()
}

function registerDependency(container: Container, dependency: Injectable): void {
  const actions: {
    [K in InjectableType]: () => void;
  } = {
    'Instance': () => defineDependencyScope(container, dependency),
    'Constructor': () => defineDependencyScope(container, dependency),
    'ConstantValue': () => container
      .bind(dependency.token)
      .toConstantValue(dependency.provider),
    'DynamicValue': () => container
      .bind(dependency.token)
      .toDynamicValue(dependency.provider),
    'Factory': () => container
      .bind(dependency.token)
      .toFactory(dependency.provider),
    'Function': () => container
      .bind(dependency.token)
      .toFunction(dependency.provider),
    'Invalid': () => container
      .bind(dependency.token),
    'Provider': () => container
      .bind(dependency.token)
      .toProvider(dependency.provider),
  };

  actions[dependency.type]();
}

export function registerDependencies(container: Container, dependencies: Array<Injectable>): void {
  dependencies.forEach(dependency => {
    registerDependency(container, dependency);
  });
}

export const singleton = <T>(token: interfaces.ServiceIdentifier<T>) => fluentProvide(token)
  .inSingletonScope()
  .done(true);