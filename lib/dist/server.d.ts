import { Logger } from './logger';
import { Player } from './player';
import { WebSocketServerFactory } from './socket/webSocketServerFactory';
import { Game } from './game';
import { GameFactory } from './gameFactory';
import { Uuid } from './uuid';
/**
 * Game Server
 */
export declare class Server {
    private webSocketServerFactory;
    private gameFactory;
    private uuid;
    private logger;
    private server;
    private queue;
    private games;
    constructor(webSocketServerFactory: WebSocketServerFactory, gameFactory: GameFactory, uuid: Uuid, logger?: Logger);
    start(port?: number): void;
    enqueue(player: Player): void;
    matchMake(): Game;
    /**
     * Teardown a game.
     *
     * @param {Game} game
     * @param {WebSocket} player
     */
    teardownGame(game: Game): void;
}
