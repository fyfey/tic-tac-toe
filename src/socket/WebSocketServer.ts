import { IncomingMessage } from 'http';
import { Socket } from 'net';
import WebSocket = require('ws');

export interface WebSocketServer {
  emit(event: 'connection', ws: WebSocket, request: Request): boolean;
  handleUpgrade(
    request: IncomingMessage,
    socket: Socket,
    head: Buffer,
    doneCb: (ws: WebSocket, request: IncomingMessage) => void
  ): void;
  on(event: 'connection', cb: (ws: WebSocket) => void): void;
}
