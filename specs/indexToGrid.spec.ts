import { indexToGrid } from '..';

describe('indexToGrid', () => {
    it('Should get the grid reference for an index', () => {
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
          const result = indexToGrid(p[2]);
          expect(result.x).toBe(p[0], `Failed for ${p[2]}, got ${JSON.stringify(result)}`);
          expect(result.y).toBe(p[1], `Failed for ${p[2]}, got ${JSON.stringify(result)}`);
        });
    });
});
