import { HttpResponse, } from '@shared/domain/types/http-response';

export interface HttpRepository {
  get<T>(
    url: string, 
    params?: Record<string, any>
  ): Promise<HttpResponse<T> | undefined>;
  post<T>(
    url: string,
    body: any,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T> | undefined>;
  put<T>(
    url: string,
    body: any,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T> | undefined>;
  patch<T>(
    url: string,
    body: any,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T> | undefined>;
  delete<T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T> | undefined>;
}