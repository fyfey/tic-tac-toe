
const MODE_GAME = 0x00; // Gameplay commands
const MODE_MOVE = 0x01; // A move command

const GAME_SEARCH     = 0x00; // Server is searching for game
const GAME_START      = 0x01; // Server has matched
const GAME_QUIT       = 0x02; // Other player has left
const GAME_PLAYER_ONE = 0x03; // You are player one (go first)
const GAME_PLAYER_TWO = 0x04; // You are player two (go second)
const GAME_WIN_ONE    = 0x05;
const GAME_WIN_TWO    = 0x06;
const GAME_STALE_MATE = 0x07;

/**
 * Encode a game command packet
 *
 * @param {number} action
 */
function encodeGamePacket(action) {
  return action << 1;
}

/**
 * Decode a game packet
 *
 * @param {number} Packet
 * @return {number} GAME_* const
 */
function decodeGamePacket(packet) {
  return (packet & 0xfe) >> 1;
}

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
function encodeMovePacket(player, x, y) {
  return 0x01 | (player << 1) | (x << 2) | (y << 4);
}

/**
 * Decode a move packet
 *
 * @param {number} Move packet
 * @returns { player: (0|1), x: (0-2), y: (0-2) }
 */
function decodeMovePacket(packet) {
  return {
    player: (((packet & 0x02) >> 1) != 0) ? 1 : 0,
    x: (packet & 0x0c) >> 2,
    y: (packet & 0x30) >> 4
  };
}

module.exports = {
  MODE_GAME,
  MODE_MOVE,
  GAME_SEARCH,
  GAME_START,
  GAME_QUIT,
  GAME_PLAYER_ONE,
  GAME_PLAYER_TWO,
  GAME_WIN_ONE,
  GAME_WIN_TWO,
  GAME_STALE_MATE,
  encodeGamePacket,
  encodeMovePacket,
  decodeGamePacket,
  decodeMovePacket,
}
