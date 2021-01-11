import { Player } from './player';
import { Game } from './game';
import { Uuid } from './uuid';

export class GameFactory {
  constructor(private uuid: Uuid) {}
  new(one: Player, two: Player): Game {
    return new Game(one, two, this.uuid);
  }
}
