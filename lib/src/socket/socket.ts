import { Observable } from 'rxjs';
import { Buffer } from 'buffer';

export interface Socket {
    send(message: Buffer): void;
    onMessage(): Observable<Buffer>;
    close(): void;
    onClose(cb: () => void): void;
    removeAllListeners(): void;
}
