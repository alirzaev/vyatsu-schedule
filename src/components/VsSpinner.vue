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
    @import "../sass/common"

    .vs-spinner
        text-align: center
        margin-top: $vs-navbar-height + 0.5em
        display: block
</style>