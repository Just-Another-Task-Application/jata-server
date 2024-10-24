export interface FileService {
  readLocalFile(path: string): Promise<Buffer | null>;
}