import { EventEmitter } from 'events';
import { Player } from './player';
import { checkWin, getCell, setCell } from './gameLogic';
import { Logger, NullLogger } from './logger';
import { MessageType, SocketMessage } from './protocol';
import { Uuid } from './uuid';
const {
    GAME_MOVE,
    GAME_START,
    GAME_QUIT,
    GAME_SEARCH,
    GAME_PLAYER_ONE,
    GAME_PLAYER_TWO,
    GAME_WIN_ONE,
    GAME_WIN_TWO,
    GAME_STALE_MATE,
} = MessageType;

export class Game extends EventEmitter {
    private _board = 0;
    private active = true;
    private _hash: string;

    constructor(
        private _one: Player,
        private _two: Player,
        private uuid: Uuid,
        private logger: Logger = new NullLogger()
    ) {
        super();
        this.logger.info('Game found!');
        this._hash = this.uuid.create();
        this.startGame();
    }

    end() {
        this._board = undefined;
        this._one.socket.removeAllListeners();
        this._two.socket.removeAllListeners();
        this._one = undefined;
        this._two = undefined;
        this._hash = undefined;
        this.uuid = undefined;
        this.active = false;
    }

    get hash(): string {
        return this._hash;
    }

    get board(): number {
        return this._board;
    }

    get one(): Player {
        return this._one;
    }
    get two(): Player {
        return this._two;
    }

    /**
     * Send an int
     * @param {int} msg Int message
     */
    broadcast(msg: SocketMessage<any>) {
        this.one.send(msg);
        this.two.send(msg);
    }
    startGame() {
        this.broadcast({ type: GAME_START });
        this.one.send({ type: GAME_PLAYER_ONE });
        this.two.send({ type: GAME_PLAYER_TWO });
        this.one.socket
            .onMessage()
            .subscribe((msg: SocketMessage<any>) =>
                this.handleMessage(this.one, msg, GAME_WIN_ONE)
            );
        this.two.socket
            .onMessage()
            .subscribe((msg: SocketMessage<any>) =>
                this.handleMessage(this.two, msg, GAME_WIN_TWO)
            );
        this.handleClose(this.one, this.two);
        this.handleClose(this.two, this.one);
    }
    handleMessage(player: Player, msg: SocketMessage<any>, winPacket: number) {
        if (!this.active) {
            this.logger.error('Game inactive, ignore message');
            return;
        }
        if (msg.type === MessageType.GAME_MOVE) {
            const { player, x, y } = msg.payload;
            console.log(
                `getCell(this.board, ${x},${y})`,
                getCell(this.board, 1, 1),
                getCell(this.board, x, y)
            );
            if (getCell(this.board, x, y)) {
                // Cell alraedy set, don't do anything!
                console.log('Player is trying to steal a square!');
                return;
            }
            this.logger.info(`Player ${player.id} moved`);
            this.broadcast(msg);
            this._board = setCell(this.board, x, y, player ? 3 : 1);
            this.logger.info('Board', this.board.toString());
            const isWin = checkWin(this.board);
            if (isWin > 0) {
                this.logger.info('WIN!');
                this.active = false;
                this.broadcast({ type: winPacket });
                this.emit('end');
            }
            if (isWin === -1) {
                this.active = false;
                this.broadcast({ type: winPacket });
                this.emit('end');
            }
        }
    }
    handleClose(deserter: Player, remainer: Player) {
        deserter.socket.onClose(() => {
            this.logger.error(
                deserter.id,
                ' connection closed. requeue',
                remainer.id
            );
            deserter.socket.removeAllListeners();
            remainer.socket.removeAllListeners();
            this.logger.info('Send quit');
            remainer.send({ type: GAME_QUIT });
            remainer.send({ type: GAME_SEARCH });
            this.emit('requeue', remainer);
        });
    }
}
