import { assert } from 'chai';
import { shallowMount } from '@vue/test-utils';
import { createlocalVue } from './global';

import Anchor from '@/components/Anchor.vue';

describe('Anchor.vue', () => {
    it('respects props.id when passed', () => {
        const localVue = createlocalVue();
        const id = 'today';

        const wrapper = shallowMount(Anchor, {
            propsData: { id },
            localVue
        });

        const node = wrapper.find('.anchor');
        assert.equal(node.attributes('id'), id);
    });
});
