import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
  name: string;
  board: number;
  searching: boolean;
  opponent: string;
  turn: boolean;
}

export default new Vuex.Store<RootState>({
  state: {
    name: '',
    board: 0,
    searching: false,
    opponent: '',
    turn: false
  },
  mutations: {
    setName (state, payload) {
      state.name = payload.name;
    }
  },
  actions: {

  },
});
