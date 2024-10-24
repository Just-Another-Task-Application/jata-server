export interface AuthorizePort {
  exchangeAuthorizationCode(code: string): Promise<unknown>;
}