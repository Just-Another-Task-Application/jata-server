export interface DatabaseProvider<T = any> {
  datasource: T;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
