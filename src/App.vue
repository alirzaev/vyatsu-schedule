<template>
    <div id="app">
        <vsnavbar></vsnavbar>
        <div class="container">
            <router-view/>
        </div>
        <footer class="page-footer font-small pt-3 vs-footer pb-1">
            <div class="footer-copyright text-center py-3">© 2018 Copyright:
                <a href="https://vk.me/rzaevali">Али Рзаев</a>
            </div>
        </footer>
    </div>
</template>

<script>
import Vsnavbar from './components/VsNavBar';

export default {
    components: {
        Vsnavbar
    }
};
</script>

<style scoped lang="sass">
    @import "sass/common"

    .container
        padding-top: $vs-navbar-height + 0.6em
    
    .vs-footer
        min-height: $vs-footer-height
</style>