import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        navbarTitle: ''
    },
    mutations: {
        changeTitle (state, title) {
            state.navbarTitle = title;
        }
    },
    actions: {}
})
