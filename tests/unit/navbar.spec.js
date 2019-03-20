import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { createlocalVue } from './global';

import NavBar from '@/components/NavBar.vue';

describe('NavBar.vue', () => {
    it('renders state.global.navbarTitle', () => {
        const title = 'Заголовок';
        const store = new Vuex.Store({
            modules: {
                global: {
                    state: {
                        navbarTitle: title
                    }
                }
            }
        });

        const localVue = createlocalVue();

        const wrapper = mount(NavBar, {
            localVue,
            store
        });

        const titleNode = wrapper.find('.navbar-brand');
        assert.equal(titleNode.text(), title);
    });
});
