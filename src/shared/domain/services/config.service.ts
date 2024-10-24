export interface ConfigService {
  get<T = string>(key: string, defaultValue?: T): T | undefined;
}