import { indexToGrid, indexToGridSize } from '../src';

describe('indexToGrid', () => {
    it('Should get the grid reference for an index', () => {
        [
            // x  y  expected
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
            expect(result.x).toBe(
                p[0],
                `Failed for ${p[2]}, got ${JSON.stringify(result)}`
            );
            expect(result.y).toBe(
                p[1],
                `Failed for ${p[2]}, got ${JSON.stringify(result)}`
            );
        });
    });
});
describe('indexToGridSize', () => {
    it('Should get the grid reference for an index', () => {
        [
            // x  y  expected
            [0, 0, 0],
            [1, 0, 1],
            [2, 0, 2],
            [3, 0, 3],
            [0, 1, 4],
            [1, 1, 5],
            [2, 1, 6],
            [3, 1, 7],
            [0, 2, 8],
            [1, 2, 9],
            [2, 2, 10],
            [3, 2, 11],
            [0, 3, 12],
            [1, 3, 13],
            [2, 3, 14],
            [3, 3, 15],
        ].forEach((p) => {
            const result = indexToGridSize(p[2], 4);
            expect(result.x).toBe(
                p[0],
                `Failed for ${p[2]}, got ${JSON.stringify(result)}`
            );
            expect(result.y).toBe(
                p[1],
                `Failed for ${p[2]}, got ${JSON.stringify(result)}`
            );
        });
    });
});
