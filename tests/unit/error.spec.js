import { assert } from 'chai';
import { shallowMount } from '@vue/test-utils';
import { createlocalVue } from './global';

import Error from '@/components/Error.vue';

describe('Error.vue', () => {
    it('renders props.title when passed', () => {
        const localVue = createlocalVue();
        const title = 'Возможно вы ошиблись группой';

        const wrapper = shallowMount(Error, {
            propsData: { title },
            localVue
        });

        const titleNode = wrapper.find('h4');
        assert.equal(titleNode.text(), title);
    });

    it('renders props.message when passed', () => {
        const localVue = createlocalVue();
        const message = 'Возможно вы ошиблись группой';

        const wrapper = shallowMount(Error, {
            propsData: { message },
            localVue
        });

        const messageNode = wrapper.find('p');
        assert.equal(messageNode.text(), message);
    });
});

