/**
 * Get the numerical index of a cell
 *
 * @param {number} x
 * @param {number} y
 *
 * returns {number}
 */
function gridToIndex(x, y) {
    return 3 * y + x;
}

/**
 * Get the grid reference for an index
 *
 * @param {number} i
 *
 * returns {object}
 */
function indexToGrid(i) {
    return { x: i % 3, y: Math.floor(i / 3) }
}

/**
 * Bit offset for a cell
 *
 * @param {number} x
 * @param {number} y
 *
 * returns {number}
 */
function bitOffset(x, y) {
    return gridToIndex(x, y) * 2;
}

/**
 * Get the mask for a cell.
 *
 * @param {number} x
 * @param {number} y
 *
 * returns {number}
 */
function getMask(x, y) {
    return 0x03 << bitOffset(x, y);
}

/**
 * Get the state of a cell.
 *
 * @param {number} board
 * @param {number} x
 * @param {number} y
 *
 * returns {number}
 */
function getCell(board, x, y) {
    return (board & getMask(x, y)) >> bitOffset(x, y);
}

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
function setCell(board, x, y, state) {
    return board &~ (0x03 << bitOffset(x, y)) | state << bitOffset(x, y);
}

const wins = [
    // Horizontal - player 1
    [0x3f, 0x15, 1],
    [0x3f << 6, 0x15 << 6, 1],
    [0x3f << 12, 0x15 << 12, 1],

    // Horizontal - player 2
    [0x3f, 0x3f, 2],
    [0x3f << 6, 0x3f << 6, 2],
    [0x3f << 12, 0x3f << 12, 2],

    // Vertical - player 1
    [0x30c3, 0x1041, 1],
    [0x30c3 << 2, 0x1041 << 2, 1],
    [0x30c3 << 4, 0x1041 << 4, 1],

    // Vertical - player 2
    [0x30c3, 0x30c3, 2],
    [0x30c3 << 2, 0x30c3 << 2, 2],
    [0x30c3 << 4, 0x30c3 << 4, 2],

    // Diagonal - player 1
    [0x3330, 0x1110, 1],
    [0x030303, 0x010101, 1],

    // Diagonal - player 2
    [0x030303, 0x030303, 2],
    [0x3330, 0x3330, 2],
];
const numWins = wins.length;

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
function checkWin(board) {
  for (let i = 0; i < numWins; i++) {
    if ((board & wins[i][0]) === wins[i][1]) {
      return wins[i][2];
    }
  }
  let count = 0;
  for (let i = 0; i < 9; i++) {
    if ((board & (3 << (i*2))) > 0) {
      count++;
    }
  }
  return count === 9 ? -1 : 0;
}

function checkDraw(board) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      if ((board & (3 << (i*2))) > 0) {
        count++;
      }
    }
    return count === 9 && !checkWin();
}

export { bitOffset, gridToIndex, indexToGrid, getMask, getCell, setCell, checkWin, checkDraw };
