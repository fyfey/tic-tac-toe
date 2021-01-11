import { Player } from './player';
import { Game } from './game';
import { Uuid } from './uuid';
export declare class GameFactory {
    private uuid;
    constructor(uuid: Uuid);
    new(one: Player, two: Player): Game;
}
