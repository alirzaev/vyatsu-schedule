import {getSchedule, getDepartmentSchedule} from '../../utils/api';

export default {
    namespaced: true,
    state: {
        group: {
            data: null,
            error: null
        },
        department: {
            data: null,
            error: null,
            selectedTeacher: null
        }
    },
    mutations: {
        setGroupSchedule: (state, {data, error}) => {
            state.group.data = data;
            state.group.error = error;
        },
        setDepartmentSchedule: (state, {data, error}) => {
            state.department.data = data;
            state.department.error = error;
        },
        selectTeacher: (state, teacher) => {
            state.department.selectedTeacher = teacher;
        }
    },
    actions: {
        loadGroupSchedule: async (context, {groupId, season}) => {
            context.commit('setGroupSchedule', {data: null, error: null});

            const [data, error] = await getSchedule(groupId, season);
            context.commit('setGroupSchedule', {data, error});

            if (!error) {
                context.commit('setTitle', data['group'], { root: true });
            }
        },
        loadDepartmentSchedule: async (context, {departmentId, season}) => {
            context.commit('setDepartmentSchedule', {data: null, error: null});
            context.commit('selectTeacher', null);

            const [data, error] = await getDepartmentSchedule(departmentId, season);
            context.commit('setDepartmentSchedule', {data, error});
        }
    }
};
