/// <reference types="node" />
import { WebSocketServer } from './WebSocketServer';
import { Socket } from 'net';
import { Server as WsServer, ServerOptions } from 'ws';
import { IncomingMessage } from 'http';
import * as WebSocket from 'ws';
export declare class WsWebSocketServer implements WebSocketServer {
    server: WsServer;
    constructor(options?: ServerOptions);
    emit(event: 'connection', ws: WebSocket, request: Request): boolean;
    handleUpgrade(request: IncomingMessage, socket: Socket, head: Buffer, doneCb: (ws: WebSocket, request: IncomingMessage) => void): void;
    on(event: 'connection', cb: (ws: WebSocket) => void): void;
}
