'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var events = require('events');

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
    return { x: i % 3, y: Math.floor(i / 3) };
}
function indexToGridSize(i, size) {
    return { x: i % size, y: Math.floor(i / size) };
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
    return (board & ~(0x03 << bitOffset(x, y))) | (state << bitOffset(x, y));
}
var wins = [
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
var numWins = wins.length;
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
    for (var i = 0; i < numWins; i++) {
        if ((board & wins[i][0]) === wins[i][1]) {
            return wins[i][2];
        }
    }
    var count = 0;
    for (var i = 0; i < 9; i++) {
        if ((board & (3 << (i * 2))) > 0) {
            count++;
        }
    }
    return count === 9 ? -1 : 0;
}
function checkDraw(board) {
    var count = 0;
    for (var i = 0; i < 9; i++) {
        if ((board & (3 << (i * 2))) > 0) {
            count++;
        }
    }
    return count === 9 && checkWin(board) === -1;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var colors = require('colors/safe');
var NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    NullLogger.prototype.info = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
    };
    NullLogger.prototype.error = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
    };
    return NullLogger;
}());

(function (MessageType) {
    MessageType[MessageType["GAME"] = 0] = "GAME";
    MessageType[MessageType["MOVE"] = 1] = "MOVE";
    MessageType[MessageType["LOBBY"] = 2] = "LOBBY";
})(exports.MessageType || (exports.MessageType = {}));
(function (LobbyMessageType) {
    LobbyMessageType[LobbyMessageType["LOBBY_PLAYER_JOIN"] = 0] = "LOBBY_PLAYER_JOIN";
    LobbyMessageType[LobbyMessageType["LOBBY_PLAYER_LEAVE"] = 1] = "LOBBY_PLAYER_LEAVE";
    LobbyMessageType[LobbyMessageType["LOBBY_SEND_MESSAGE"] = 2] = "LOBBY_SEND_MESSAGE";
    LobbyMessageType[LobbyMessageType["LOBBY_RECEIVE_MESSAGE"] = 3] = "LOBBY_RECEIVE_MESSAGE";
    LobbyMessageType[LobbyMessageType["LOBBY_GAME_CHALLENGE"] = 4] = "LOBBY_GAME_CHALLENGE";
    LobbyMessageType[LobbyMessageType["LOBBY_GAME_ACCEPT"] = 5] = "LOBBY_GAME_ACCEPT";
    LobbyMessageType[LobbyMessageType["LOBBY_GAME_REJECT"] = 6] = "LOBBY_GAME_REJECT";
    LobbyMessageType[LobbyMessageType["LOBBY_GAME_RESULT"] = 7] = "LOBBY_GAME_RESULT";
    LobbyMessageType[LobbyMessageType["LOBBY_DM_SEND"] = 8] = "LOBBY_DM_SEND";
    LobbyMessageType[LobbyMessageType["LOBBY_DM_RECEIVE"] = 9] = "LOBBY_DM_RECEIVE";
})(exports.LobbyMessageType || (exports.LobbyMessageType = {}));
(function (GameMessageType) {
    GameMessageType[GameMessageType["GAME_SEARCH"] = 0] = "GAME_SEARCH";
    GameMessageType[GameMessageType["GAME_START"] = 1] = "GAME_START";
    GameMessageType[GameMessageType["GAME_QUIT"] = 2] = "GAME_QUIT";
    GameMessageType[GameMessageType["GAME_PLAYER_ONE"] = 3] = "GAME_PLAYER_ONE";
    GameMessageType[GameMessageType["GAME_PLAYER_TWO"] = 4] = "GAME_PLAYER_TWO";
    GameMessageType[GameMessageType["GAME_WIN_ONE"] = 5] = "GAME_WIN_ONE";
    GameMessageType[GameMessageType["GAME_WIN_TWO"] = 6] = "GAME_WIN_TWO";
    GameMessageType[GameMessageType["GAME_STALE_MATE"] = 7] = "GAME_STALE_MATE";
})(exports.GameMessageType || (exports.GameMessageType = {}));
var typeMap = {
    0x00: exports.GameMessageType.GAME_SEARCH,
    0x01: exports.GameMessageType.GAME_START,
    0x02: exports.GameMessageType.GAME_QUIT,
    0x03: exports.GameMessageType.GAME_PLAYER_ONE,
    0x04: exports.GameMessageType.GAME_PLAYER_TWO,
};
(function (PlayerNumber) {
    PlayerNumber[PlayerNumber["ONE"] = 0] = "ONE";
    PlayerNumber[PlayerNumber["TWO"] = 1] = "TWO";
})(exports.PlayerNumber || (exports.PlayerNumber = {}));
/**
 * Encode a move command packet
 *
 * Packet structure:
 * ┌───4───┬───3───┬─2─┬─1─┐
 * | 0 | 0 | 0 | 0 | 0 | 1 |
 * 1. Mode         (1)
 * 2. Player       (0|1)
 * 3. X coordinate (0-2)
 * 4. Y coordinate (0-2)
 *
 * @param {number} player
 * @param {number} x
 * @param {number} y
 */
function encodeMovePacket(player, x, y) {
    return 0x01 | (player << 1) | (x << 2) | (y << 4);
}
/**
 * Encode a game command packet
 *
 * @param {number} action
 */
function encodeGamePacket(action) {
    return action << 1;
}
/**
 * Decode a game packet
 *
 * @param {number} Packet
 * @return {number} GAME_* const
 */
function decodeGamePacket(packet) {
    return (packet & 0xfe) >> 1;
}
/**
 * Decode a move packet
 *
 * @param {number} Move packet
 * @returns { player: (0|1), x: (0-2), y: (0-2) }
 */
function decodeMovePacket(packet) {
    return {
        player: (packet & 0x02) >> 1 != 0 ? 1 : 0,
        x: (packet & 0x0c) >> 2,
        y: (packet & 0x30) >> 4,
    };
}

var MOVE = exports.MessageType.MOVE;
var GAME_START = exports.GameMessageType.GAME_START, GAME_QUIT = exports.GameMessageType.GAME_QUIT, GAME_SEARCH = exports.GameMessageType.GAME_SEARCH, GAME_PLAYER_ONE = exports.GameMessageType.GAME_PLAYER_ONE, GAME_PLAYER_TWO = exports.GameMessageType.GAME_PLAYER_TWO, GAME_WIN_ONE = exports.GameMessageType.GAME_WIN_ONE, GAME_WIN_TWO = exports.GameMessageType.GAME_WIN_TWO, GAME_STALE_MATE = exports.GameMessageType.GAME_STALE_MATE;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(_one, _two, uuid, logger) {
        if (logger === void 0) { logger = new NullLogger(); }
        var _this = _super.call(this) || this;
        _this._one = _one;
        _this._two = _two;
        _this.uuid = uuid;
        _this.logger = logger;
        _this._board = 0;
        _this.active = true;
        _this.logger.info('Game found!');
        _this._hash = _this.uuid.create();
        _this.startGame();
        return _this;
    }
    Game.prototype.end = function () {
        this._board = undefined;
        this._one.socket.removeAllListeners();
        this._two.socket.removeAllListeners();
        this._one = undefined;
        this._two = undefined;
        this._hash = undefined;
        this.uuid = undefined;
        this.active = false;
    };
    Object.defineProperty(Game.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "board", {
        get: function () {
            return this._board;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "one", {
        get: function () {
            return this._one;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "two", {
        get: function () {
            return this._two;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Send an int
     * @param {int} msg Int message
     */
    Game.prototype.broadcast = function (msg) {
        this.one.send(msg);
        this.two.send(msg);
    };
    Game.prototype.startGame = function () {
        var _this = this;
        this.broadcast(encodeGamePacket(GAME_START));
        this.one.send(encodeGamePacket(GAME_PLAYER_ONE));
        this.two.send(encodeGamePacket(GAME_PLAYER_TWO));
        this.one.socket
            .onMessage()
            .subscribe(function (msg) { return _this.handleMessage(_this.one, msg, GAME_WIN_ONE); });
        this.two.socket
            .onMessage()
            .subscribe(function (msg) { return _this.handleMessage(_this.two, msg, GAME_WIN_TWO); });
        this.handleClose(this.one, this.two);
        this.handleClose(this.two, this.one);
    };
    Game.prototype.handleMessage = function (player, msg, winPacket) {
        if (!this.active) {
            this.logger.error('Game inactive, ignore message');
            return;
        }
        var type = (msg.readUInt8() & MOVE) != 0 ? 'Move' : 'Game';
        if (type === 'Move') {
            var move = decodeMovePacket(msg.readUInt8());
            console.log("getCell(this.board, " + move.x + "," + move.y + ")", getCell(this.board, 1, 1), getCell(this.board, move.x, move.y));
            if (getCell(this.board, move.x, move.y)) {
                // Cell alraedy set, don't do anything!
                console.log('Player is trying to steal a square!');
                return;
            }
            this.logger.info("Player " + player.id + " moved", move.toString());
            this.broadcast(encodeMovePacket(move.player, move.x, move.y));
            this._board = setCell(this.board, move.x, move.y, move.player ? 3 : 1);
            this.logger.info('Board', this.board.toString());
            var isWin = checkWin(this.board);
            if (isWin > 0) {
                this.logger.info('WIN!');
                this.active = false;
                this.broadcast(encodeGamePacket(winPacket));
                this.emit('end');
            }
            if (isWin === -1) {
                this.active = false;
                this.broadcast(encodeGamePacket(GAME_STALE_MATE));
                this.emit('end');
            }
        }
    };
    Game.prototype.handleClose = function (deserter, remainer) {
        var _this = this;
        deserter.socket.onClose(function () {
            _this.logger.error(deserter.id, ' connection closed. requeue', remainer.id);
            deserter.socket.removeAllListeners();
            remainer.socket.removeAllListeners();
            _this.logger.info('Send quit');
            remainer.send(encodeGamePacket(GAME_QUIT));
            remainer.send(encodeGamePacket(GAME_SEARCH));
            _this.emit('requeue', remainer);
        });
    };
    return Game;
}(events.EventEmitter));

var PlayerFactory = /** @class */ (function () {
    function PlayerFactory() {
    }
    PlayerFactory.prototype.new = function (id, socket) {
        return new Player(id, socket);
    };
    return PlayerFactory;
}());
var Player = /** @class */ (function () {
    function Player(id, socket) {
        this.id = id;
        this.socket = socket;
        this.status = '';
    }
    Object.defineProperty(Player.prototype, "name", {
        get: function () {
            return this._name.toString();
        },
        set: function (name) {
            this._name = Buffer.from(name);
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.send = function (message) {
        this.socket.send(new Uint8Array([message]));
    };
    return Player;
}());

exports.Game = Game;
exports.Player = Player;
exports.PlayerFactory = PlayerFactory;
exports.bitOffset = bitOffset;
exports.checkDraw = checkDraw;
exports.checkWin = checkWin;
exports.decodeGamePacket = decodeGamePacket;
exports.decodeMovePacket = decodeMovePacket;
exports.encodeGamePacket = encodeGamePacket;
exports.encodeMovePacket = encodeMovePacket;
exports.getCell = getCell;
exports.getMask = getMask;
exports.gridToIndex = gridToIndex;
exports.indexToGrid = indexToGrid;
exports.indexToGridSize = indexToGridSize;
exports.setCell = setCell;
