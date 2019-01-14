<template>
    <div v-show="visible" class="vs-spinner">
        <spinner></spinner>
    </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
    name: 'vsspinner',
    components: {
        Spinner
    },
    props: ['visible']
};
</script>

<style scoped lang="sass">
    .vs-spinner
        text-align: center
        display: block
</style>