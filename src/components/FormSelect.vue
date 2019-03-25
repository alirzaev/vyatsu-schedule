<template>
    <b-form-select
            :value="value"
            @input="$emit('input', $event)"
    >
        <option
                v-for="item in items"
                :key="item[field]"
                :value="item"
        >{{ item[field] }}</option>
    </b-form-select>
</template>

<script>
export default {
    name: 'formselect',
    props: ['items', 'value', 'field']
};
</script>

<style scoped lang="sass">
    @import "../sass/common"
</style>
