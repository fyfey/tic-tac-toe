import { Socket } from './socket/socket';
import { v4 as uuid } from 'uuid';
import { Message } from './protocol';


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
