import Vue from 'vue'
import Router from 'vue-router'
import Schedule from './components/Schedule'
import GroupChooser from './components/GroupChooser'
import Groups from './views/Groups.vue'
import Calls from './views/Calls'
import Bots from './views/Bots'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/schedule'
        },
        {
            path: '/schedule',
            component: Groups,
            children: [
                {
                    path: '',
                    component: GroupChooser
                },
                {
                    path: '/schedule/:groupId/:season',
                    component: Schedule
                }
            ]

        },
        {
            path: '/calls',
            component: Calls
        },
        {
            path: '/bots',
            component: Bots
        }
    ]
})
