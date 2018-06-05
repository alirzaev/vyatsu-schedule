import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/Schedule.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/schedule/:groupId/:season',
            name: 'schedule',
            component: About
        }
    ]
})
