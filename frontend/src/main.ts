import Vue from 'vue';
import Symbol_observable from 'symbol-observable';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faCircle, faTimes, faSpinner);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
console.log('obs', Symbol_observable);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
