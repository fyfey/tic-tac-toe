import { randomBytes } from 'crypto';

export interface Uuid {
  create(): string;
}

export class RandomHexUuid implements Uuid {
  create(): string {
    return randomBytes(4).toString('hex');
  }
}
