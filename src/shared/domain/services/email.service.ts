import { Email, } from '../models/email.model';

export interface EmailService {
  send(email: Email): Promise<boolean>;
  formatTemplate(template: Buffer | string, fields: Record<string, any>): Promise<string>;
}