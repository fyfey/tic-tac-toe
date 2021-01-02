import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { Message } from '../protocol';

export interface Socket {
  send(message: ArrayBuffer): void;
  onMessage(): Observable<Buffer>;
  close(): void;
  onClose(cb: () => void): void;
  removeAllListeners(): void;
}
