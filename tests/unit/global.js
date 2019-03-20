import { createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Router from 'vue-router';
import Vuex from 'vuex';

export const createlocalVue = () => {
    const localVue = createLocalVue();

    localVue.use(BootstrapVue);
    localVue.use(Router);
    localVue.use(Vuex);

    return localVue;
};
