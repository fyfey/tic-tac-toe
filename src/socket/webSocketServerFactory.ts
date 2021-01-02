import { ServerOptions } from 'ws';
import { WebSocketServer } from './WebSocketServer';
import { WsWebSocketServer } from './WsWebSocketServer';

export class WebSocketServerFactory {
  new(options: ServerOptions): WebSocketServer {
    return new WsWebSocketServer(options);
  }
}
