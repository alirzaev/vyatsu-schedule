import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueScrollTo from 'vue-scrollto';
import VuePageTitle from 'vue-page-title';
import VueYandexMetrika from 'vue-yandex-metrika';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './utils/config';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueScrollTo);
Vue.use(VuePageTitle, {
    suffix: '| Расписание занятий'
});
Vue.use(VueYandexMetrika, {
    id: config.yandexMetrikaId,
    router: router,
    env: process.env.NODE_ENV,
    debug: process.env.NODE_ENV !== 'production',
    options: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
