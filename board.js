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

/**
 * Check for a win.
 *
 * @param {number} board
 *
 * returns {boolean}
 */
function checkWin(board) {
    return [
        0x15, // Horizontal - player 1
        0x15 << 6,
        0x15 << 12,
        0x3f, // Horizontal - player 2
        0x3f << 6,
        0x3f << 12,
        0x1041, // Vertical - player 1
        0x1041 << 2,
        0x1041 << 4,
        0x30c3, // Vertical - player 2
        0x30c3 << 2,
        0x30c3 << 4,
        0x1110, // Diagonal - player 1
        0x010101,
        0x030303, // Diagonal - player 2
        0x3330,
    ].some(n => (board & n) === n);
}

module.exports = {
    gridToIndex,
    bitOffset,
    getMask,
    getCell,
    setCell,
    checkWin
};
