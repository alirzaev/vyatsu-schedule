<template>
    <b-button-group>
        <b-button
                size="md"
                v-scroll-to="'#today'"
                variant="secondary"
        >Сегодня</b-button>
        <div class="splitter"></div>
        <b-button
                size="md"
                v-scroll-to="'#top'"
                variant="secondary"
        >▲</b-button>
    </b-button-group>
</template>

<script>
export default {
    name: 'toolbar'
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    .splitter
        background-color: #5b5b5b
        width: 0.1rem
</style>
