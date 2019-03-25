import { assert } from 'chai';
import { shallowMount } from '@vue/test-utils';
import { createlocalVue } from './global';

import FormSelect from '@/components/FormSelect.vue';

describe('FormSelect.vue', () => {
    it('renders items passed through props.items', () => {
        const localVue = createlocalVue();
        const items = [
            {text: 'one', value: 1},
            {text: 'two', value: 2}
        ];
        const field = 'text';

        const wrapper = shallowMount(FormSelect, {
            propsData: { items, field },
            localVue
        });

        const options = wrapper.findAll('option');
        assert.equal(options.length, items.length);
        options.wrappers.forEach((option, index) => {
            assert.equal(option.text().trim(), items[index].text);
        });
    });
});
