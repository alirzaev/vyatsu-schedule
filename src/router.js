import Vue from 'vue';
import Router from 'vue-router';
import Schedule from './components/Schedule';
import GroupChooser from './components/GroupChooser';
import Groups from './views/Groups.vue';
import Calls from './views/Calls';
import Bot from './views/Bot';
import Departments from './views/Departments';
import DepartmentChooser from './components/DepartmentChooser';
import DepartmentSchedule from './components/DepartmentSchedule';

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
            path: '/department',
            component: Departments,
            children: [
                {
                    path: '',
                    component: DepartmentChooser
                },
                {
                    path: '/department/:departmentId/:season',
                    component: DepartmentSchedule
                }
            ]

        },
        {
            path: '/calls',
            component: Calls
        },
        {
            path: '/bot',
            component: Bot
        }
    ]
});
