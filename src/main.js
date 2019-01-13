import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueScrollTo from 'vue-scrollto';
import VuePageTitle from 'vue-page-title';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueScrollTo);
Vue.use(VuePageTitle, {
    suffix: '| Расписание занятий'
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
