const { checkWin } = require('../board');

describe('checkWin', () => {
    it('Check if a board is won', () => {
        [
            [0x00, false],

            [0x15, true],
            [0x540, true],
            [0x15000, true],

            [0x3f, true],
            [0xfc0, true],
            [0x3f000, true],

            [0x1041, true],
            [0x4104, true],
            [0x10410, true],

            [0x30c3, true],
            [0xc30c, true],
            [0x30c3, true],

            [0x1110, true],
            [0x3330, true],

            [0x010101, true],
            [0x030303, true],
        ].forEach((p) => {
            expect(checkWin(p[0])).toBe(p[1]);
        });
    });
});
