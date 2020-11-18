<template>
    <div>
        <div class="middle" v-if="loading">Finding a game <font-awesome-icon :icon="['fa', 'spinner']" spin></font-awesome-icon></div>
        <div class="middle" v-if="!loading">
            <players v-if="winner === -2" :player="player"></players>
            <div v-if="winner > -2" class="notice">
                <div v-if="winner === player && winner > -1">You win!</div>
                <div v-if="winner !== player && winner > -1">You lose!</div>
                <div v-if="winner === -1">Draw!</div>
                <a v-on:click="reset()">Play again</a>
            </div>
            <div id="board" v-bind:class="{
                inactive: player !== turn,
                winner: winner > -1 && winner === player,
                loser: winner > -1 && winner !== player,
                draw: winner === -1
                }">
                <div class="cell" v-for="(cell, idx) in cells" v-on:click="clickCell(idx)" :key="idx">
                    <font-awesome-icon v-if="cell === 1" :icon="['far', 'circle']" size="3x"></font-awesome-icon>
                    <font-awesome-icon v-if="cell === 2" :icon="['fa', 'times']" size="3x"></font-awesome-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
$cellSize: 100px;
body {
  background: rgb(3, 9, 44);
}
.notice {
    background: white;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 5px;
}
#board {
    width: $cellSize * 3;
    height: $cellSize * 3;
    border-radius: 10px;
    overflow: hidden;
    .cell {
        background: white;
        width: $cellSize;
        height: $cellSize;
        float: left;
        box-sizing: border-box;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        position: relative;
        &:hover {
            cursor: pointer;
            background: rgb(236, 236, 236);
        }
        svg {
            top: 50%;
            left: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
        }
    }
    &.winner {
        box-shadow: 0px 0px 20px 5px lime;
        .cell {
            background: white;
        }
        &.inactive {
            .cell {
                background: white;
            }
        }
    }
    &.loser {
        box-shadow: 0px 0px 20px 5px red;
        &.inactive {
            .cell {
                background: white;
            }
        }
        .cell {
            background: white;
        }
    }
    &.draw {
        box-shadow: 0px 0px 20px 5px orange;
        &.inactive {
            .cell {
                background: white;
            }
        }
        .cell {
            background: white;
        }
    }
    &.inactive {
        .cell {
            background: rgb(214, 214, 214);
            &:hover {
                cursor: not-allowed;
            }
        }
    }
}
button {
  cursor: pointer;
  background: #2d41f8;
  outline: none;
  border-radius: 5px;
  border: 0;
  height: 35px;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  border-bottom: 3px solid darken(#2d41f8, 15%);
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createSocket, MessageType, GameMessageType, MovePayload, Player, encodeMovePacket, SocketMessage }  from '../game/socket';
import Players from '../components/Players.vue';
const { gridToIndex, indexToGrid } = require('tic-tac-toe');
import { WebSocketSubject } from 'rxjs/webSocket';

let socket: WebSocketSubject<SocketMessage<GameMessageType | MovePayload>>;

@Component({
  components: {
      Players,
  },
  data: () => {
    return {
    };
  },
})
export default class Game extends Vue {

    public loading = true;
    public cells = new Array(9).fill(0);
    public player: any = null;
    public turn = 0;
    public winner: any = -2;

    public created() {
        this.reset();
    }

    public reset() {
        this.loading = true;
        this.cells = new Array(9).fill(0);
        this.player = null;
        this.turn = 0;
        this.winner = -2;
        socket = createSocket();
        socket.subscribe((message) => {
            console.log('message', message);
            if (message.type === MessageType.GAME) {
                this.handleGameEvent(message.payload as GameMessageType);
            }
            if (message.type === MessageType.MOVE) {
                this.handleMoveEvent(message.payload as MovePayload);
            }
        });
    }

    public handleGameEvent(e: GameMessageType) {
        console.log('game event', e);
        switch (e) {
            case GameMessageType.GAME_START:
            console.log('GAME START');
            this.loading = false;
            break;
            case GameMessageType.GAME_PLAYER_ONE:
            this.loading = false;
            this.player = Player.ONE;
            console.log('PLAYER ONE', this.player);
            break;
            case GameMessageType.GAME_PLAYER_TWO:
            this.loading = false;
            this.player = Player.TWO;
            console.log('PLAYER TWO', this.player);
            break;
            case GameMessageType.GAME_WIN_ONE:
            this.winner = Player.ONE;
            console.log('WIN PLAYER ONE. You are player', this.player);
            socket.complete();
            break;
            case GameMessageType.GAME_WIN_TWO:
            this.winner = Player.TWO;
            console.log('WIN PLAYER TWO. You are player', this.player);
            socket.complete();
            break;
            case GameMessageType.GAME_STALE_MATE:
            this.winner = -1;
            socket.complete();
            break;
            case GameMessageType.GAME_QUIT:
            console.log('QUIT');
            this.loading = true;
            this.player = null;
            //socket.complete();
            break;
        }
    }

    public handleMoveEvent(e: MovePayload) {
        console.log('move event', e);
        this.cells[gridToIndex(e.x, e.y)] = e.player + 1;
        this.turn = 1 - this.turn;
    }

    public clickCell(id: number) {
        console.log('Click cell', id);
        if (this.player !== this.turn) {
            return;
        }
        const { x, y } = indexToGrid(id);
        socket.next({
            type: MessageType.MOVE,
            payload: {
                player: this.player,
                x,
                y,
            },
        } as SocketMessage<MovePayload>);
    }
}
</script>
