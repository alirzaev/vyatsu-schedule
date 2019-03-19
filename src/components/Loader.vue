<template>
    <div class="loader"></div>
</template>

<script>

export default {
    name: 'loader'
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    .loader
        margin: 0 auto
        border: 3px solid rgb(238, 238, 238)
        border-radius: 100%
        border-top: 3px solid rgb(33, 150, 243)
        width: 32px
        height: 32px
        animation: spin 0.8s linear infinite

    @keyframes spin
        0%
            transform: rotate(0deg)
        100%
            transform: rotate(360deg)
</style>