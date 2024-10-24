import { URL, URLSearchParams, } from 'node:url';

import { injectable, } from 'inversify';

import { HttpResponse, } from '@shared/domain/types/http-response';
import { HttpRepository, } from '@shared/domain/repositories/http.repository';

@injectable()
export class FetchHttpRepository implements HttpRepository {
  async get<T>(
    url: string, 
    params: Record<string, any> = {},
  ): Promise<HttpResponse<T> | undefined> {
    try {
      const endpoint = new URL(url);

      const {
        headers = {},
      } = params;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          ...(headers && {
            ...headers,
          }),
        },
      });

      const result = await response.json();

      return {
        length: 0,
        data: result as T,
      };
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async post<T>(
    url: string, 
    body: any, 
    params: Record<string, any> = {}
  ): Promise<HttpResponse<T> | undefined> {
    try {
      const endpoint = new URL(url);

      const {
        headers = {},
      } = params;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          ...(headers && {
            ...headers,
          }),
        },
        body: body && this.formatBody(headers, body),
      });

      const result = await response.json();
      return {
        length: 0,
        data: result as T,
      };
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async put<T>(
    url: string, 
    body: any, 
    params: Record<string, any> = {},
  ): Promise<HttpResponse<T> | undefined> {
    try {
      const endpoint = new URL(url);

      const {
        headers = {},
      } = params;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          ...(headers && {
            ...headers,
          }),
        },
        body: body && this.formatBody(headers, body),
      });

      const result = await response.json() as HttpResponse<T>;
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async patch<T>(
    url: string, 
    body: any, 
    params: Record<string, any> = {},
  ): Promise<HttpResponse<T> | undefined> {
    try {
      const endpoint = new URL(url);

      const {
        headers = {},
      } = params;

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          ...(headers && {
            ...headers,
          }),
        },
        body: body && this.formatBody(headers, body),
      });

      const result = await response.json() as HttpResponse<T>;
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async delete<T>(
    url: string, 
    params: Record<string, any> = {},
  ): Promise<HttpResponse<T> | undefined> {
    try {
      const endpoint = new URL(url);

      const {
        headers = {},
      } = params;

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          ...(headers && {
            ...headers,
          }),
        },
      });

      if (response.status === 204) {
        return;
      }

      const result = await response.json() as HttpResponse<T>;
      return result;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  private formatBody(headers: Record<string, any>, body: any): any {
    return headers['Content-Type'] === 'application/x-www-form-urlencoded'
      ? new URLSearchParams(body)
      : JSON.stringify(body);
  }
}