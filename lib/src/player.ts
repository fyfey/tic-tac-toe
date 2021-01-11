import { Socket } from './socket/socket';
import { Message } from './protocol';

export class PlayerFactory {
  new(id: string, socket: Socket): Player {
    return new Player(id, socket);
  }
}

export class Player {
  private _name: Buffer;
  public status = '';
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
