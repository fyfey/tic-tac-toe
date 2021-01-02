import { EventEmitter } from 'events';
import { Player } from './engine';
import { checkWin, getCell, setCell } from './gameLogic';
import { Logger, NullLogger } from './logger';
import {
  decodeMovePacket,
  encodeGamePacket,
  encodeMovePacket,
  GameMessageType,
  MessageType,
} from './protocol';
import { Uuid } from './uuid';
const { MOVE } = MessageType;
const {
  GAME_START,
  GAME_QUIT,
  GAME_SEARCH,
  GAME_PLAYER_ONE,
  GAME_PLAYER_TWO,
  GAME_WIN_ONE,
  GAME_WIN_TWO,
  GAME_STALE_MATE,
} = GameMessageType;

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
  broadcast(msg: number) {
    this.one.send(msg);
    this.two.send(msg);
  }
  startGame() {
    this.broadcast(encodeGamePacket(GAME_START));
    this.one.send(encodeGamePacket(GAME_PLAYER_ONE));
    this.two.send(encodeGamePacket(GAME_PLAYER_TWO));
    this.one.socket
      .onMessage()
      .subscribe((msg) => this.handleMessage(this.one, msg, GAME_WIN_ONE));
    this.two.socket
      .onMessage()
      .subscribe((msg) => this.handleMessage(this.two, msg, GAME_WIN_TWO));
    this.handleClose(this.one, this.two);
    this.handleClose(this.two, this.one);
  }
  handleMessage(player: Player, msg: Buffer, winPacket: number) {
    if (!this.active) {
      this.logger.error('Game inactive, ignore message');
      return;
    }
    const type = (msg.readUInt8() & MOVE) != 0 ? 'Move' : 'Game';
    if (type === 'Move') {
      const move = decodeMovePacket(msg.readUInt8());
      console.log(
        `getCell(this.board, ${move.x},${move.y})`,
        getCell(this.board, 1, 1),
        getCell(this.board, move.x, move.y)
      );
      if (getCell(this.board, move.x, move.y)) {
        // Cell alraedy set, don't do anything!
        console.log('Player is trying to steal a square!');
        return;
      }
      this.logger.info(`Player ${player.id} moved`, move.toString());
      this.broadcast(encodeMovePacket(move.player, move.x, move.y));
      this._board = setCell(this.board, move.x, move.y, move.player ? 3 : 1);
      this.logger.info('Board', this.board.toString());
      const isWin = checkWin(this.board);
      if (isWin > 0) {
        this.logger.info('WIN!');
        this.active = false;
        this.broadcast(encodeGamePacket(winPacket));
        this.emit('end');
      }
      if (isWin === -1) {
        this.active = false;
        this.broadcast(encodeGamePacket(GAME_STALE_MATE));
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
      remainer.send(encodeGamePacket(GAME_QUIT));
      remainer.send(encodeGamePacket(GAME_SEARCH));
      this.emit('requeue', remainer);
    });
  }
}
