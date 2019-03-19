import Vue from 'vue';
import Router from 'vue-router';
import GroupSchedule from './views/groups/GroupSchedule';
import GroupChooser from './views/groups/GroupChooser';
import Groups from './views/groups/Groups';
import Calls from './views/Calls';
import Bot from './views/Bot';
import Departments from './views/departments/Departments';
import DepartmentChooser from './views/departments/DepartmentChooser';
import DepartmentSchedule from './views/departments/DepartmentSchedule';

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
                    component: GroupSchedule
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
