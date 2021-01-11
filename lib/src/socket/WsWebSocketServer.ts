import { WebSocketServer } from './WebSocketServer';
import { Socket } from 'net';
import { Server as WsServer, ServerOptions } from 'ws';
import { IncomingMessage } from 'http';
import * as WebSocket from 'ws';

export class WsWebSocketServer implements WebSocketServer {
  server: WsServer;

  constructor(options: ServerOptions = {}) {
    this.server = new WsServer(options);
  }

  emit(event: 'connection', ws: WebSocket, request: Request): boolean {
    return this.server.emit('connection', ws, request);
  }

  handleUpgrade(
    request: IncomingMessage,
    socket: Socket,
    head: Buffer,
    doneCb: (ws: WebSocket, request: IncomingMessage) => void
  ): void {
    return this.server.handleUpgrade(request, socket, head, doneCb);
  }

  on(event: 'connection', cb: (ws: WebSocket) => void): void {
    this.server.on('connection', cb);
  }
}
