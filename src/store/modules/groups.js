import {getGroups} from '../../utils/api';

export default {
    namespaced: true,
    state: {
        data: null,
        error: null,
        selectedFaculty: null,
        selectedGroup: null,
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
                state.selectedGroup = null;
            }
            state.selectedFaculty = faculty;
        },
        selectGroup: (state, group) => {
            state.selectedGroup = group;
        },
        selectSeason: (state, season) => {
            state.selectedSeason = season;
        }
    },
    actions: {
        init: async (context) => {
            const [data, error] = await getGroups();
            context.commit('setData', {data, error});
            await context.dispatch('loadFromLocalStorage');
        },
        loadFromLocalStorage: async (context) => {
            const faculty = localStorage.getItem('faculty');
            const group = localStorage.getItem('group');

            if (faculty) {
                const facultyItem = (context.state.data || [])
                    .find(item => item['faculty'] === faculty);

                if (facultyItem && group) {
                    const groupItem = facultyItem['groups'].find(item => item['name'] === group);

                    context.commit('selectFaculty', facultyItem);
                    context.commit('selectGroup', groupItem);
                } else {
                    context.commit('selectFaculty', facultyItem);
                }
            }
        },
        saveToLocalStorage: (context) => {
            localStorage.setItem('faculty', context.state.selectedFaculty['faculty']);
            localStorage.setItem('group', context.state.selectedGroup['name']);
        }
    }
};