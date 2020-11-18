const WebSocket = require('ws');
const port = process.env.PORT || 8000;
const http = require('http');
const static = require('node-static');
const file = new static.Server('./dist');
const url = require('url');

const server = http.createServer((req, res) => {
  req.addListener('end', () => file.serve(req, res)).resume();
});

const wss = new WebSocket.Server({ noServer: true  });
const crypto = require('crypto');
const EventEmitter = require('events');
const { info, error } = require('./logger');
const { getCell, setCell, checkWin, checkDraw } = require('tic-tac-toe');

const {
  encodeMovePacket,
  encodeGamePacket,
  decodeMovePacket,
  MODE_MOVE,
  GAME_SEARCH,
  GAME_START,
  GAME_QUIT,
  GAME_PLAYER_ONE,
  GAME_PLAYER_TWO,
  GAME_WIN_ONE,
  GAME_WIN_TWO,
  GAME_STALE_MATE,
} = require('./src/protocol');

const queue = [];
const games = {};

function uuid() {
    return crypto.randomBytes(3).toString('hex');
}

class Game extends EventEmitter {
  constructor([one, two]) {
    super();
    info('Game found!');
    this.one = one;
    this.two = two;
    this.board = 0;
    this.active = true;
    this.hash = uuid();
    this.startGame();
  }
  /**
   * Send an int
   * @param {int} msg Int message
   */
  send(msg) {
    send(this.one, msg);
    send(this.two, msg);
  }
  /**
   * Send a binary buffer
   * @param {buffer} msg Raw message
   */
  sendRaw(msg) {
    this.one.send(msg);
    this.two.send(msg);
  }
  startGame() {
    this.send(encodeGamePacket(GAME_START));
    send(this.one, encodeGamePacket(GAME_PLAYER_ONE));
    send(this.two, encodeGamePacket(GAME_PLAYER_TWO));
    this.one.on('message', msg => this.handleMessage(this.one, msg, GAME_WIN_ONE));
    this.two.on('message', msg => this.handleMessage(this.two, msg, GAME_WIN_TWO));
    this.handleClose(this.one, this.two);
    this.handleClose(this.two, this.one);
  }
  handleMessage(socket, msg, winPacket) {
    if (!this.active) {
      error('Game inactive, ignore message');
      return;
    }
    const type = ((msg.readUInt8() & MODE_MOVE) != 0) ? 'Move' : 'Game';
    if (type === 'Move') {
      const move = decodeMovePacket(msg.readUInt8());
      console.log(`getCell(this.board, ${move.x},${move.y})`, getCell(this.board, 1, 1), getCell(this.board, move.x, move.y));
      if (getCell(this.board, move.x, move.y)) {
        // Cell alraedy set, don't do anything!
        console.log('Player is trying to steal a square!');
        return;
      }
      info(`Player ${socket.id} moved`, move);
      this.sendRaw(msg);
      this.board = setCell(this.board, move.x, move.y, move.player ? 3 : 1);
      info('Board', this.board);
      const isWin = checkWin(this.board);
      if (isWin > 0) {
        info('WIN!');
        this.active = false;
        this.send(encodeGamePacket(winPacket));
        this.emit('end');
      }
      if (isWin === -1) {
        this.active = false;
        this.send(encodeGamePacket(GAME_STALE_MATE));
        this.emit('end');
      }
    }
  }
  handleClose(deserter, remainer) {
    deserter.addEventListener('close', () => {
      error(deserter.id, ' connection closed. requeue', remainer.id);
      deserter.removeAllListeners();
      remainer.removeAllListeners();
      info('Send quit');
      send(remainer, encodeGamePacket(GAME_QUIT));
      send(remainer, encodeGamePacket(GAME_SEARCH));
      this.emit('requeue', remainer);
    });
  }
}

/**
 * Teardown a game.
 *
 * @param {Game} game
 * @param {WebSocket} player 
 */
function teardownGame(game) {
  info('Teardown', game.hash);
  game.one = undefined;
  game.two = undefined;
  game.board = undefined;
  delete games[game.hash];
  info('games', Object.keys(games));
}

function send(socket, packet) {
  info('send', packet);
  try {
    socket.send(new Uint8Array([packet]));
  } catch (err) {
    error('Failed to send to socket', socket.id);
  }
}

function matchMake() {
  info('Matchmake!');
  if (queue.length > 1) {
    const game = new Game(queue.splice(-2, 2));
    game.once('requeue', (player) => {
      teardownGame(game);
      enqueue(player);
    });
    game.once('end', () => {
      teardownGame(game);
    });
    games[game.hash] = game;
    info('games', Object.keys(games));
    info('queue', queue.map(p => p.id));
  }
}

wss.on('connection', function connection(ws) {
  ws.id = uuid();
  info('New player', ws.id);
  enqueue(ws);
  matchMake();
});

function enqueue(ws) {
  queue.unshift(ws);
  info('queue', queue.map(p => p.id));
  send(ws, encodeGamePacket(GAME_SEARCH));
  ws.on('close', () => {
    info(`Queuer ${ws.id} closed connection`);
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].id === ws.id) {
        queue.splice(i, 1);
        info('queue', queue.map(p => p.id));
      }
    }
  });
}

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;
 
  if (pathname === '/') {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  } else  {
    socket.destroy();
  }
});

server.listen(8000);
info(`listening on ${port}`);
