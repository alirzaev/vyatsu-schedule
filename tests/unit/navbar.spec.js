import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { createlocalVue } from './global';

import NavBar from '@/components/NavBar.vue';

describe('NavBar.vue', () => {
    it('renders props.title as navbar brand title', () => {
        const title = 'Заголовок';

        const localVue = createlocalVue();

        const wrapper = mount(NavBar, {
            localVue,
            propsData: {
                title
            }
        });

        const titleNode = wrapper.find('.navbar-brand');
        assert.equal(titleNode.text(), title);
    });
});
