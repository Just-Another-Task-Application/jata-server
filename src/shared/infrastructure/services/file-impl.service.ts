import fs from 'node:fs';
import { injectable, } from 'inversify';

import { FileService, } from '@shared/domain/services/file.service';

@injectable()
export class FileImplService implements FileService {
  async readLocalFile(path: string): Promise<Buffer | null> {
    try {
      const file = await fs.promises.readFile(path);
      return file;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}