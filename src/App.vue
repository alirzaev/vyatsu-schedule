<template>
    <div id="app">
        <navbar></navbar>
        <div class="container">
            <router-view/>
        </div>
        <footer class="page-footer font-small pt-3 footer pb-1">
            <div class="footer-copyright text-center py-3">© 2018-2019
                <a href="https://vk.me/rzaevali">Али Рзаев</a>
            </div>
        </footer>
    </div>
</template>

<script>
import navbar from './components/NavBar';

export default {
    components: {
        navbar
    },
    created: async function() {
        await this.$store.dispatch('init');
    }
};
</script>

<style scoped lang="sass">
    @import "sass/common"

    .container
        padding-top: $vs-navbar-height + 0.6em
    
    .footer
        min-height: $vs-footer-height
</style>