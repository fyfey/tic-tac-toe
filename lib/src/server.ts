import { Server as FsServer } from 'node-static';
import { createServer, Server as HttpServer } from 'http';
import { URL } from 'url';
import { Logger, NullLogger } from './logger';
import { Player } from './player';
import { WsSocket } from './socket/WsSocket';
import * as WebSocket from 'ws';
import { WebSocketServerFactory } from './socket/webSocketServerFactory';
import { Game } from './game';
import { GameFactory } from './gameFactory';
import { Uuid } from './uuid';

const file = new FsServer('./public');

/**
 * Game Server
 */
export class Server {
    private server: HttpServer;
    private queue: Player[] = [];
    private games: { [hash: string]: Game } = {};

    constructor(
        private webSocketServerFactory: WebSocketServerFactory,
        private gameFactory: GameFactory,
        private uuid: Uuid,
        private logger: Logger = new NullLogger()
    ) {
        this.server = createServer((req, res) => {
            req.addListener('end', () => {
                console.log('end');
                return file.serve(req, res);
            }).resume();
        });

        const wss = this.webSocketServerFactory.new({ noServer: true });
        this.server.on('upgrade', (request, socket, head) => {
            const pathname = new URL(request.url).pathname;

            this.logger.info('pathName', pathname);

            if (pathname === '/') {
                wss.handleUpgrade(request, socket, head, (ws) => {
                    wss.emit('connection', ws, request);
                });
            } else {
                socket.destroy();
            }
        });
        wss.on('connection', (ws: WebSocket) => {
            const player: Player = new Player(
                this.uuid.create(),
                new WsSocket(ws)
            );
            this.logger.info('New player', player.id);
            this.enqueue(player);
            this.matchMake();
        });
    }

    start(port: number = 8000) {
        this.server.listen(port);
        this.logger.info(`listening on ${port}`);
    }

    enqueue(player: Player) {
        this.queue.unshift(player);
        this.logger.info('queue', ...this.queue.map((p) => p.id));
        player.send(encodeGamePacket(GAME_SEARCH));
        player.socket.onClose(() => {
            this.logger.info(`Queuer ${player.id} closed connection`);
            for (let i = 0; i < this.queue.length; i++) {
                if (this.queue[i].id === player.id) {
                    this.queue.splice(i, 1);
                    this.logger.info('queue', ...this.queue.map((p) => p.id));
                }
            }
        });
    }
    matchMake(): Game {
        this.logger.info('Matchmake!');
        if (this.queue.length < 2) {
            return;
        }
        const [one, two] = this.queue.splice(-2, 2);
        const game = this.gameFactory.new(one, two);
        game.once('requeue', (player: Player) => {
            this.teardownGame(game);
            this.enqueue(player);
        });
        game.once('end', () => {
            this.teardownGame(game);
        });
        this.games[game.hash] = game;
        this.logger.info('games', ...Object.keys(this.games));
        this.logger.info('queue', ...this.queue.map((p) => p.id));
        return game;
    }
    /**
     * Teardown a game.
     *
     * @param {Game} game
     * @param {WebSocket} player
     */
    teardownGame(game: Game) {
        this.logger.info('Teardown', game.hash);
        delete this.games[game.hash];
        game.end();
        this.logger.info('games', ...Object.keys(this.games));
    }
}
