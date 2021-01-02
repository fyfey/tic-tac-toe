import { GameFactory } from './gameFactory';
import { ConsoleLogger } from './logger';
import { Server } from './server';
import { WebSocketServerFactory } from './socket/webSocketServerFactory';
import { WsWebSocketServer } from './socket/WsWebSocketServer';
import { RandomHexUuid } from './uuid';

const webSocketServerFactory = new WebSocketServerFactory();
const gameFactory = new GameFactory(new RandomHexUuid());
const logger = new ConsoleLogger();

const server = new Server(
  webSocketServerFactory,
  gameFactory,
  new RandomHexUuid(),
  logger
);
server.start();
