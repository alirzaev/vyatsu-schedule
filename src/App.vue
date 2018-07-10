<template>
    <div id="app">
        <vsnavbar></vsnavbar>
        <vsspinner v-bind:visible="spinner"></vsspinner>
        <div class="container">
            <router-view/>
        </div>
        <footer class="page-footer font-small pt-3">
            <div class="footer-copyright text-center py-3">© 2018 Copyright:
                <a href="https://vk.me/rzaevali">Али Рзаев</a>
            </div>
        </footer>
    </div>
</template>

<script>
import Vsnavbar from './components/VsNavBar';
import Vsspinner from './components/VsSpinner';

export default {
    components: {
        Vsnavbar,
        Vsspinner
    },
    computed: {
        spinner: function () {
            return this.$store.state.spinner;
        }
    }
};
</script>

<style scoped lang="sass">
    @import "sass/common"

    .container
        padding-top: $vs-navbar-height + 0.6em
</style>