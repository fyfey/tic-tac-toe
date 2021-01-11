/// <reference types="node" />
import { EventEmitter } from 'events';
import { Player } from './player';
import { Logger } from './logger';
import { Uuid } from './uuid';
export declare class Game extends EventEmitter {
    private _one;
    private _two;
    private uuid;
    private logger;
    private _board;
    private active;
    private _hash;
    constructor(_one: Player, _two: Player, uuid: Uuid, logger?: Logger);
    end(): void;
    get hash(): string;
    get board(): number;
    get one(): Player;
    get two(): Player;
    /**
     * Send an int
     * @param {int} msg Int message
     */
    broadcast(msg: number): void;
    startGame(): void;
    handleMessage(player: Player, msg: Buffer, winPacket: number): void;
    handleClose(deserter: Player, remainer: Player): void;
}
