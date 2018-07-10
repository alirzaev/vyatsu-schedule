import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        navbarTitle: '',
        spinner: false
    },
    mutations: {
        changeTitle (state, title) {
            state.navbarTitle = title;
        },
        showSpinner (state) {
            state.spinner = true;
        },
        hideSpinner (state) {
            state.spinner = false;
        }
    },
    actions: {}
});
