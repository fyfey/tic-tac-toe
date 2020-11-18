<template>
    <div id="players">
        <div id="player-one">
            <span v-if="player === 0">You <font-awesome-icon :icon="['far', 'circle']" size="1x"></font-awesome-icon></span>
            <span v-if="player === 1">You <font-awesome-icon :icon="['fa', 'times']" size="1x"></font-awesome-icon></span>
        </div>
        <div class="separator"><i class="fa fa-arrow-left"></i></div>
        <div id="player-two">
            <span v-if="player === 0"><font-awesome-icon :icon="['fa', 'times']" size="1x"></font-awesome-icon> Opponent</span>
            <span v-if="player === 1"><font-awesome-icon :icon="['far', 'circle']" size="1x"></font-awesome-icon> Opponent</span>
        </div>
    </div>
</template>

<style lang="scss">
$cellSize: 100px;
#players {
    background: white;
    border-radius: 10px;
    height: 10px;
    margin-bottom: 10px;
    text-align: center;
    padding: 20px 0;
    #player-one {
        float: left;
        width: $cellSize * 1.5;
    }
    #player-two {
        float: right;
        width: $cellSize * 1.5;
    }
    .separator {
        width: 0px;
        float: left;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: ['player'],
})
export default class Players extends Vue {
}
</script>
