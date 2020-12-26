import { getCell } from '../src/main';

describe('getCell', () => {
    it('Should get the cell state from the board at 2,0', () => {
        const board = 0xff;

        const result = getCell(board, 2, 0);

        expect(result).toBe(0x03);
    });
    it('Should get the cell state from the board at 0,1', () => {
        const board = 0x7f;

        const result = getCell(board, 0, 1);

        expect(result).toBe(0x01);
    });
});
