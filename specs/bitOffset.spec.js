const { bitOffset } = require('../board');

describe('bitOffset', () => {
    it('Should get the bit offset for a grid reference', () => {
        [ // x, y, expected
            [0, 0, 0],
            [1, 0, 2],
            [2, 0, 4],
            [0, 1, 6],
            [1, 1, 8],
            [2, 1, 10],
            [0, 2, 12],
            [1, 2, 14],
            [2, 2, 16],
        ].forEach((p) => {
            expect(bitOffset(p[0], p[1])).toBe(p[2], `Failed for (${p[0]},${p[1]})`);
        });
    });
});
