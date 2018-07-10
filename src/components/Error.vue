<template>
    <b-alert show variant="danger">
        <h4 class="alert-heading">{{title}}</h4>
        <p>{{message}}</p>
        <hr>
        <p class="mb-0">
            Попробуйте перезагрузить страницу или перейдите на
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

<style scoped>

</style>