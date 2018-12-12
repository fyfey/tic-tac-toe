const { getMask } = require('..');

describe('getMask', () => {
    it('Should get the mask for a grid reference', () => {
        [ // x, y, expected
            [0, 0, 0x03],
            [1, 0, 0x0C],
            [2, 0, 0x30],
            [0, 1, 0xC0],
            [1, 1, 0x300],
            [2, 1, 0xC00],
            [0, 2, 0x3000],
            [1, 2, 0xC000],
            [2, 2, 0x30000],
        ].forEach((p) => {
            expect(getMask(p[0], p[1])).toBe(p[2], `Failed for (${p[0]},${p[1]})`);
        });
    });
});
