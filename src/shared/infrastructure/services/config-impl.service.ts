import { injectable, } from 'inversify';

import { ConfigService, } from '@shared/domain/services/config.service';

@injectable()
export class ConfigImplService implements ConfigService {
  get<T>(key: string, defaultValue: T): T | undefined {
    let result = process.env[key] as T;
    if (typeof result === 'number') {
      result = +result as T;
    }

    return (result ?? defaultValue);
  }
}