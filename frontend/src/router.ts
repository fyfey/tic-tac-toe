import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Game from './views/Game.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: '/game'
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
  ],
});
