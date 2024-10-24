export interface BaseModel {
  id: string;
}

export interface Model extends BaseModel {
  createdAt?: string;
  updatedAt?: string;
}