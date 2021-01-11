export declare enum MessageType {
    GAME = 0,
    MOVE = 1,
    LOBBY = 2
}
export declare enum LobbyMessageType {
    LOBBY_PLAYER_JOIN = 0,
    LOBBY_PLAYER_LEAVE = 1,
    LOBBY_SEND_MESSAGE = 2,
    LOBBY_RECEIVE_MESSAGE = 3,
    LOBBY_GAME_CHALLENGE = 4,
    LOBBY_GAME_ACCEPT = 5,
    LOBBY_GAME_REJECT = 6,
    LOBBY_GAME_RESULT = 7,
    LOBBY_DM_SEND = 8,
    LOBBY_DM_RECEIVE = 9
}
export declare enum GameMessageType {
    GAME_SEARCH = 0,
    GAME_START = 1,
    GAME_QUIT = 2,
    GAME_PLAYER_ONE = 3,
    GAME_PLAYER_TWO = 4,
    GAME_WIN_ONE = 5,
    GAME_WIN_TWO = 6,
    GAME_STALE_MATE = 7
}
export declare enum PlayerNumber {
    ONE = 0,
    TWO = 1
}
export declare type GridReference = number;
export interface MoveMessageType {
    player: PlayerNumber;
    x: GridReference;
    y: GridReference;
}
export interface SocketMessage<T extends LobbyMessageType | GameMessageType | MoveMessageType> {
    type: MessageType;
    payload: T;
}
export declare type Message = LobbyMessageType | GameMessageType | MoveMessageType;
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
export declare function encodeMovePacket(player: number, x: number, y: number): number;
/**
 * Encode a game command packet
 *
 * @param {number} action
 */
export declare function encodeGamePacket(action: GameMessageType): number;
/**
 * Decode a game packet
 *
 * @param {number} Packet
 * @return {number} GAME_* const
 */
export declare function decodeGamePacket(packet: number): GameMessageType;
/**
 * Decode a move packet
 *
 * @param {number} Move packet
 * @returns { player: (0|1), x: (0-2), y: (0-2) }
 */
export declare function decodeMovePacket(packet: number): MoveMessageType;
