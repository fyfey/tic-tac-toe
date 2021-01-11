import { checkWin } from '../src';

describe('checkWin', () => {
    it('Check if a board is won', () => {
        [
            // Empty board
            [0x00, 0],

            // Horizontal - player 1
            [0x15, 1],
            [0x540, 1],
            [0x15000, 1],

            // Horizontal - player 2
            [0x3f, 2],
            [0xfc0, 2],
            [0x3f000, 2],

            // Vertical - player 1
            [0x1041, 1],
            [0x4104, 1],
            [0x10410, 1],

            // Vertical - player 2
            [0x30c3, 2],
            [0xc30c, 2],
            [0x30c3, 2],

            // Diagonal - player 1
            [0x010101, 1],
            [0x1110, 1],

            // Diagonal - player 2
            [0x030303, 2],
            [0x3330, 2],
        ].forEach((p) => {
            expect(checkWin(p[0])).toBe(p[1], p[0].toString(16));
        });
    });
});
describe('checkDraw', () => {
    it('Should see that 0,2 is not set and bail', () => {
        const board = 0x17f4d;

        const result = checkWin(board);

        expect(result).toBe(0);
    });
    it('Should detect a draw!', () => {
        const board = 0x3775d;

        const result = checkWin(board);

        expect(result).toBe(-1);
    });
});
