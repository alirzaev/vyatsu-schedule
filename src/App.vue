<template>
    <div id="app">
        <navbar :title="$store.state.global.navBarTitle"></navbar>
        <div class="container">
            <router-view/>
            <footer class="page-footer font-small pt-3 footer pb-1 standard-container">
                <div class="content-column">
                    <div class="footer-copyright text-center py-3">&copy; 2018-2020
                        <a href="https://vk.me/rzaevali">Али Рзаев</a>
                    </div>
                </div>
            </footer>
        </div>
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
    @import "sass/grids/standard"

    .container
        padding-top: $vs-navbar-height + 0.6em

    .footer
        min-height: $vs-footer-height

    .oborona
        max-width: 100%
        border-radius: 0.25em
</style>
