const {
  encodeGamePacket,
  encodeMovePacket,
  decodeGamePacket,
  decodeMovePacket,
  GAME_SEARCH,
  GAME_START,
  GAME_QUIT,
  GAME_PLAYER_ONE,
  GAME_PLAYER_TWO,
  GAME_WIN_ONE,
  GAME_WIN_TWO,
  GAME_STALE_MATE
} = require('../src/protocol');

function testMovePacket(player, x, y, expected, errorMsg) {
  it(`p${player} x${x} y${y} => ${errorMsg}`, () => {
    const result = encodeMovePacket(player, x, y);
    expect(result).toBe(expected, errorMsg);
  });
}

describe('protocol', () => {
  describe('encodeGamePacket', () => {
    it('GAME_SEARCH', () => {
      const result = encodeGamePacket(GAME_SEARCH);
      expect(result).toBe(0x00);
    });
    it('GAME_START', () => {
      const result = encodeGamePacket(GAME_START);
      expect(result).toBe(0x02);
    });
    it('GAME_QUIT', () => {
      const result = encodeGamePacket(GAME_QUIT);
      expect(result).toBe(0x04);
    });
    it('GAME_PLAYER_ONE', () => {
      const result = encodeGamePacket(GAME_PLAYER_ONE);
      expect(result).toBe(0x06);
    });
    it('GAME_PLAYER_TWO', () => {
      const result = encodeGamePacket(GAME_PLAYER_TWO);
      expect(result).toBe(0x08);
    });
    it('GAME_WIN_ONE', () => {
      const result = encodeGamePacket(GAME_WIN_ONE);
      expect(result).toBe(0x0a);
    });
    it('GAME_WIN_TWO', () => {
      const result = encodeGamePacket(GAME_WIN_TWO);
      expect(result).toBe(0x0c);
    });
    it('GAME_STALE_MATE', () => {
      const result = encodeGamePacket(GAME_STALE_MATE);
      expect(result).toBe(0x0e);
    });
  });

  describe('encodeMovePacket', () => {
    /**
     * Player X Y expected failString
     */
    const tests = [
      [0, 0, 0, 0x01, '0x01'],
      [0, 1, 0, 0x05, '0x05'],
      [0, 2, 0, 0x09, '0x09'],
      [1, 1, 1, 0x17, '0x17'],
      [1, 0, 2, 0x23, '0x23'],
      [1, 2, 2, 0x2b, '0x2b'],
    ];

    tests.forEach((t) => {
      testMovePacket(...t);
    });
  });

  describe('decodeGamePacket', () => {
    it('Decodes search packet', () => {
      const result = decodeGamePacket(encodeGamePacket(GAME_SEARCH));
      expect(result).toBe(GAME_SEARCH);
    });
    it('Decodes player one packet', () => {
      const result = decodeGamePacket(encodeGamePacket(GAME_PLAYER_ONE));
      expect(result).toBe(GAME_PLAYER_ONE);
    });
  });

  describe('decodeMovePacket', () => {
    it('Decodes move packet', () => {
      const result = decodeMovePacket(encodeMovePacket(1, 2, 0));
      expect(result).toEqual({ player: 1, x: 2, y: 0 });
    })
  });
});
