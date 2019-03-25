import {getDepartments} from '../../utils/api';

export default {
    namespaced: true,
    state: {
        data: null,
        error: null,
        selectedFaculty: null,
        selectedDepartment: null,
        selectedSeason: null,
    },
    mutations: {
        setData: (state, {data, error}) => {
            if (data) {
                state.data = data.sort((a, b) => a['faculty'].localeCompare(b['faculty']));
            }
            state.error = error;
        },
        selectFaculty: (state, faculty) => {
            const oldFaculty = state.selectedFaculty;
            if (oldFaculty && oldFaculty['faculty'] !== faculty['faculty']) {
                state.selectedDepartment = null;
            }
            state.selectedFaculty = faculty;
        },
        selectDepartment: (state, department) => {
            state.selectedDepartment = department;
        },
        selectSeason: (state, season) => {
            state.selectedSeason = season;
        }
    },
    actions: {
        init: async (context) => {
            const [data, error] = await getDepartments();
            context.commit('setData', {data, error});
        }
    }
};