<template>
    <div id="app">
        <vyatsunavbar></vyatsunavbar>
        <vsspinner v-bind:visible="spinner"></vsspinner>
        <div class="content container">
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
import Vyatsunavbar from './components/VyatSUNavBar';
import Vsspinner from './components/VsSpinner';

export default {
    components: {
        Vyatsunavbar,
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

    .content
        padding-top: $vs-navbar-height + 0.6em
</style>