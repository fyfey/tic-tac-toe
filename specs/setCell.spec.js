const { setCell } = require('../board');

describe('setCell', () => {
    it('Sets a 1 at a grid reference', () => {
        [ // x  y  expected
            [0, 0, 0x3fffd],
            [1, 0, 0x3fff7],
            [2, 0, 0x3ffdf],
            [0, 1, 0x3ff7f],
            [1, 1, 0x3fdff],
            [2, 1, 0x3f7ff],
            [0, 2, 0x3dfff],
            [1, 2, 0x37fff],
            [2, 2, 0x1ffff],
        ].forEach((p) => {
            const result = setCell(0x3ffff, p[0], p[1], 1);
            expect(result).toBe(p[2], `Failed for (${p[0]},${p[1]})`);
        });
    });
});
