/// <reference types="node" />
import { Observable } from 'rxjs';
import { Socket } from './socket';
import * as WebSocket from 'ws';
export declare class WsSocket implements Socket {
    private socket;
    private Subject;
    constructor(socket: WebSocket);
    send(message: ArrayBuffer): void;
    onMessage(): Observable<Buffer>;
    close(): void;
    onClose(cb: () => void): void;
    removeAllListeners(): void;
}
