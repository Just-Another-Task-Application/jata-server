import { Email, } from '@shared/domain/models/email.model';
import { Builder, } from '@shared/domain/interfaces/builder';

import { EmailDTO, } from '../dtos/email.dto';

export class EmailBuilder implements Builder<Email> {
  private readonly email: Email;

  constructor(data: EmailDTO) {
    this.email = {
      from: data?.from,
      to: data?.to,
      subject: data?.subject,
      body: data?.body,
    } as Email;
  }

  withCC(cc: string): EmailBuilder {
    this.email.cc = cc;
    return this;
  }

  withBCC(bcc: string): EmailBuilder {
    this.email.bcc = bcc;
    return this;
  }

  withAMP(amp: boolean): EmailBuilder {
    this.email.amp = amp;
    return this;
  }

  withAttachments(attachments: any): EmailBuilder {
    this.email.attachments = attachments;
    return this;
  }

  build(): Email {
    throw new Error('Method not implemented.');
  }
}