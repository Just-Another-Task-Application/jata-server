export interface HttpResponse<T> {
  length: number;
  ok?: boolean;
  data: T;
}