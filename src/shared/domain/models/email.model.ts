export interface Email {
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  amp?: boolean;
  body: string;
  attachments?: any;
}