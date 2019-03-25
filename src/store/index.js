import Vue from 'vue';
import Vuex from 'vuex';

import global from './modules/global';
import groups from './modules/groups';
import departments from './modules/departments';
import schedule from './modules/schedule';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        global,
        groups,
        departments,
        schedule
    }
});