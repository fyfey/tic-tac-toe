import { Board, GridRef } from './interfaces';
/**
 * Get the numerical index of a cell
 *
 * @param {number} x
 * @param {number} y
 *
 * returns {number}
 */
export declare function gridToIndex(x: number, y: number): number;
/**
 * Get the grid reference for an index
 *
 * @param {number} i
 *
 * returns {object}
 */
export declare function indexToGrid(i: number): GridRef;
export declare function indexToGridSize(i: number, size: number): GridRef;
/**
 * Bit offset for a cell
 *
 * @param {number} x
 * @param {number} y
 *
 * returns {number}
 */
export declare function bitOffset(x: number, y: number): number;
/**
 * Get the mask for a cell.
 *
 * @param {number} x
 * @param {number} y
 *
 * returns {number}
 */
export declare function getMask(x: number, y: number): number;
/**
 * Get the state of a cell.
 *
 * @param {number} board
 * @param {number} x
 * @param {number} y
 *
 * returns {number}
 */
export declare function getCell(board: Board, x: number, y: number): number;
/**
 * Set the state of a cell.
 *
 * @param {number} board
 * @param {number} x
 * @param {number} y
 * @param {number} state
 *
 * returns {number}
 */
export declare function setCell(board: Board, x: number, y: number, state: Board): number;
/**
 * Check for a win.
 *
 * Returns:
 *  0 | no win
 * -1 | draw
 *  1 | player 1 win
 *  2 | player 2 win
 *
 * @param {number} board
 * @returns {number}
 */
export declare function checkWin(board: Board): number;
export declare function checkDraw(board: Board): boolean;
