import { Email } from "@shared/domain/models/email.model";

export interface EmailDTO extends Pick<Email, 'from' | 'to' | 'subject' | 'body'> {}