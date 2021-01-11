/// <reference types="node" />
import { Observable } from 'rxjs';
export interface Socket {
    send(message: ArrayBuffer): void;
    onMessage(): Observable<Buffer>;
    close(): void;
    onClose(cb: () => void): void;
    removeAllListeners(): void;
}
