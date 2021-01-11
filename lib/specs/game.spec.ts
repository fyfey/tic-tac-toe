import { setCell, checkWin } from '../src';

describe('Test game', () => {
    it('1 should win a game', () => {
        let board = 0;

        board = setCell(board, 0, 0, 1);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 1, 0, 2);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 0, 1, 1);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 0, 2, 2);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 1, 1, 1);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 2, 1, 2);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 2, 2, 1);
        expect(checkWin(board)).toBe(1);
    });
    it('2 should win a game', () => {
        let board = 0;

        board = setCell(board, 0, 0, 3);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 1, 0, 1);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 0, 1, 3);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 0, 2, 1);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 1, 1, 3);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 2, 1, 1);
        expect(checkWin(board)).toBe(0);
        board = setCell(board, 2, 2, 3);
        expect(checkWin(board)).toBe(2);
    });
});
