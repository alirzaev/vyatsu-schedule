<template>
    <b-alert :show="true" variant="danger">
        <h4 class="alert-heading">{{ title }}</h4>
        <p>{{ message }}</p>
        <hr>
        <p class="mb-0">
            Попробуйте перезагрузить страницу или перейти на
            <router-link to="/" class="alert-link">главную</router-link>
        </p>
    </b-alert>
</template>

<script>
export default {
    name: 'error',
    props: ['title', 'message']
};
</script>

<style scoped lang="sass">
    @import "../sass/common"
</style>