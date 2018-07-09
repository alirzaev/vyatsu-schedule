<template>
    <div id="app">
        <vyatsunavbar></vyatsunavbar>
        <router-view class="content"/>
        <footer class="page-footer font-small pt-3">
            <div class="footer-copyright text-center py-3">© 2018 Copyright:
                <a href="https://vk.me/rzaevali">Али Рзаев</a>
            </div>
        </footer>
    </div>
</template>

<script>
import Vyatsunavbar from './components/VyatSUNavBar';

export default {
    components: {Vyatsunavbar}
};
</script>

<style scoped>
    .content {
        padding-top: 65px;
    }
</style>