import { Socket } from './socket/socket';
import { v4 as uuid } from 'uuid';
import { Message } from './protocol';

export class PlayerFactory {
  new(id: string, socket: Socket): Player {
    return new Player(id, socket);
  }
}

export class Player {
  private _name: Buffer;
  constructor(readonly id: string, readonly socket: Socket) {}

  get name(): string {
    return this._name.toString();
  }
  set name(name: string) {
    this._name = Buffer.from(name);
  }

  send(message: Message) {
    this.socket.send(new Uint8Array([message as number]));
  }
}

const players: { [playerId: string]: Player } = {};

export function join(socket: Socket, name: string) {
  const id = uuid();
  players[id] = new Player(id, socket);
  socket.onClose(() => leave(players[id]));
}

export function leave(player: Player) {
  player.socket.removeAllListeners();
  delete players[player.id];
}
