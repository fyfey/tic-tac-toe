export enum MessageType {
  GAME,
  MOVE,
  LOBBY,
}

export enum LobbyMessageType {
  LOBBY_PLAYER_JOIN,
  LOBBY_PLAYER_LEAVE,
  LOBBY_SEND_MESSAGE,
  LOBBY_RECEIVE_MESSAGE,
  LOBBY_GAME_CHALLENGE,
  LOBBY_GAME_ACCEPT,
  LOBBY_GAME_REJECT,
  LOBBY_GAME_RESULT,
  LOBBY_DM_SEND,
  LOBBY_DM_RECEIVE,
}

export enum GameMessageType {
  GAME_SEARCH, // Server is searching for game
  GAME_START, // Server has matched
  GAME_QUIT, // Other player has left
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

type GridReference = number;

export interface MoveMessageType {
  player: Player;
  x: GridReference;
  y: GridReference;
}

export interface SocketMessage<
  T extends LobbyMessageType | GameMessageType | MoveMessageType
> {
  type: MessageType;
  payload: T;
}

export type Message = LobbyMessageType | GameMessageType | MoveMessageType;

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
export function encodeMovePacket(player: number, x: number, y: number): number {
  return 0x01 | (player << 1) | (x << 2) | (y << 4);
}

/**
 * Encode a game command packet
 *
 * @param {number} action
 */
export function encodeGamePacket(action: GameMessageType): number {
  return action << 1;
}

/**
 * Decode a game packet
 *
 * @param {number} Packet
 * @return {number} GAME_* const
 */
export function decodeGamePacket(packet: number): GameMessageType {
  return (packet & 0xfe) >> 1;
}

/**
 * Decode a move packet
 *
 * @param {number} Move packet
 * @returns { player: (0|1), x: (0-2), y: (0-2) }
 */
export function decodeMovePacket(packet: number): MoveMessageType {
  return {
    player: (packet & 0x02) >> 1 != 0 ? 1 : 0,
    x: (packet & 0x0c) >> 2,
    y: (packet & 0x30) >> 4,
  };
}
