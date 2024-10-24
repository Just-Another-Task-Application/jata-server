import { inject, singleton, } from '@ioc/container';
import type { HttpRepository } from '@shared/domain/repositories/http.repository';

import { AuthorizePort, } from './ports/authorize.port';
import { AuthorizationDTO } from '@presentation/common/dtos/authorization.dto';

@singleton(AuthorizeUseCase)
export class AuthorizeUseCase implements AuthorizePort {
  constructor(
    @inject('repositories:http') private readonly http: HttpRepository,
  ) {}

  async exchangeAuthorizationCode(code: string): Promise<{
    access_token: string,
    refresh_token: string,
    expires_in: number,
  } | null> {
    const tokenUrl = process.env.DISCORD_CLIENT_TOKEN_URL;
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = process.env.DISCORD_CLIENT_REDIRECT_URI;

    const response = await this.http
      .post<AuthorizationDTO>(
        tokenUrl!,
        {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

    if (!response) return null;

    return response.data;
  }
}