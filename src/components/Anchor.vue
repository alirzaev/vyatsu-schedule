<template>
    <a :id="id" class="anchor"></a>
</template>

<script>
export default {
    name: 'anchor',
    props: ['id']
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    .anchor
        display: block
        position: relative
        top: -($vs-navbar-height + 0.5em)
        visibility: hidden
</style>
