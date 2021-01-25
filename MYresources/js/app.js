import Vue from 'vue';
import './bootstrap'; // execute bootstrap (contains lodash import, assigns to window._)
import Board from './Board';
import apolloProvider from './apollo.config';
import router from './router.config'
import store from './vuex.config';

window.Vue = Vue; // makes Vue global

Vue.component('Board', Board);

const app = new Vue({
    el: '#app',
    apolloProvider,
    router,
    store,
    beforeCreate() {
      store.dispatch('setLoggedIn', localStorage.getItem('isLoggedIn') === 'true'); // will create empty text if 'false' is inside local storage
      store.dispatch('fetchCurrentUser');
    }
});
