import { webSocket, WebSocketSubjectConfig, WebSocketSubject } from 'rxjs/webSocket';
import { WebSocketMessage } from 'rxjs/internal/observable/dom/WebSocketSubject';

export enum MessageType {
    GAME,
    MOVE,
}

export enum GameMessageType {
    GAME_SEARCH,     // Server is searching for game
    GAME_START,      // Server has matched
    GAME_QUIT,       // Other player has left
    GAME_PLAYER_ONE, // You are player one (go first)
    GAME_PLAYER_TWO, // You are player two (go second)
    GAME_WIN_ONE,
    GAME_WIN_TWO,
    GAME_STALE_MATE,
}

const typeMap: { [key: number]: GameMessageType } = {
    0x00: GameMessageType.GAME_SEARCH,
    0x01: GameMessageType.GAME_START,
    0x02: GameMessageType.GAME_QUIT,
    0x03: GameMessageType.GAME_PLAYER_ONE,
    0x04: GameMessageType.GAME_PLAYER_TWO,
};

export enum Player {
    ONE,
    TWO,
}

type GridReference = 0 | 1 | 2;

export interface MovePayload {
    player: Player;
    x: GridReference;
    y: GridReference;
}

export interface SocketMessage<T> {
    type: MessageType;
    payload: T;
}

const protocol = (location.protocol === 'https:') ? 'wss' : 'ws';
const host = location.hostname;
const port = (protocol === 'ws') ? 8000 : location.port;

const config: WebSocketSubjectConfig<SocketMessage<GameMessageType | MovePayload>> = {
    url: `${protocol}://${host}:${port}`,
    serializer: (message: SocketMessage<GameMessageType | MovePayload>): WebSocketMessage => {
        if (message.type === MessageType.MOVE && typeof message === 'object' && 'player' in (message as any).payload) {
            const packet = new Uint8Array([encodeMovePacket((message.payload as MovePayload).player, (message.payload as MovePayload).x, (message.payload as MovePayload).y)]);
            console.log('serialize move', message, packet);
            return packet;
        }
        return '';
    },
    deserializer: (e: MessageEvent) => {
        console.log('resultSelector!', e.data);
        const [data] = new Uint8Array(e.data);
        console.log('data', data);
        const type = ((data & 0x01) != 0) ? 'Move' : 'Game';
        if (type === 'Game') {
            console.log('Game', { payload: (data & 0xfe) >> 1 });
            return {
                type: MessageType.GAME,
                payload: (data & 0xfe) >> 1 as GameMessageType,
            } as SocketMessage<GameMessageType>;
        }
        // Move type
        console.info('Move', data, {
            player: (((data & 0x02) >> 1) != 0) ? 1 : 0,
            x: (data & 0x0c) >> 2,
            y: (data & 0x30) >> 4,
        });
        return {
            type: MessageType.MOVE,
            payload: {
                player: (((data & 0x02) >> 1) != 0) ? Player.TWO : Player.ONE,
                x: (data & 0x0c) >> 2,
                y: (data & 0x30) >> 4,
            },
        } as SocketMessage<MovePayload>;
    },
    binaryType: 'arraybuffer',
};

export const createSocket = (): WebSocketSubject<SocketMessage<GameMessageType | MovePayload>> => {
    return webSocket<SocketMessage<GameMessageType | MovePayload>>(config);
};

/**
 * Encode a move command packet
 *
 * Packet structure:
 * ┌───4───┬───3───┬─2─┬─1─┐
 * | 0 | 0 | 0 | 0 | 0 | 1 |
 * 1. Mode         (1)
 * 2. Player       (0|1)
 * 3. X coordinate (0-2)
 * 4. Y coordinate (0-2)
 *
 * @param {number} player
 * @param {number} x
 * @param {number} y
 */
export function encodeMovePacket(player: number, x: number, y: number) {
  return 0x01 | (player << 1) | (x << 2) | (y << 4);
}
