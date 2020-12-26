import { gridToIndex } from '../src/main';

describe('gridToIndex', () => {
    it('Should get the index for a grid reference', () => {
        [ // x  y  expected
            [0, 0, 0],
            [1, 0, 1],
            [2, 0, 2],
            [0, 1, 3],
            [1, 1, 4],
            [2, 1, 5],
            [0, 2, 6],
            [1, 2, 7],
            [2, 2, 8],
        ].forEach((p) => {
            expect(gridToIndex(p[0], p[1])).toBe(p[2], `Failed for (${p[0]},${p[1]})`);
        });
    });
});
