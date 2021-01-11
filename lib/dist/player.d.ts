import { Socket } from './socket/socket';
import { Message } from './protocol';
export declare class PlayerFactory {
    new(id: string, socket: Socket): Player;
}
export declare class Player {
    readonly id: string;
    readonly socket: Socket;
    private _name;
    status: string;
    constructor(id: string, socket: Socket);
    get name(): string;
    set name(name: string);
    send(message: Message): void;
}
