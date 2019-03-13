import Vue from 'vue';
import Vuex from 'vuex';

import {getCalls, getGroups, getSeason, getSchedule} from './utils/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        navbarTitle: '',
        calls: {
            data: null,
            error: null
        },
        groups: {
            data: null,
            error: null
        },
        schedule: {
            data: null,
            error: null
        },
        selectedFaculty: null,
        selectedGroup: null,
        selectedSeason: null
    },
    mutations: {
        changeTitle: (state, title) => {
            state.navbarTitle = title;
        },
        setCalls: (state, {data, error}) => {
            state.calls.data = data;
            state.calls.error = error;
        },
        setGroups: (state, {data, error}) => {
            if (data) {
                state.groups.data = data.sort((a, b) => a['faculty'].localeCompare(b['faculty']));
            }
            state.groups.error = error;
        },
        setSchedule: (state, {data, error}) => {
            state.schedule.data = data;
            state.schedule.error = error;
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
            const calls = await getCalls();
            context.commit('setCalls', {data: calls[0], error: calls[1]});

            const groups = await getGroups();
            context.commit('setGroups', {data: groups[0], error: groups[1]});

            const season = await getSeason();
            context.commit('selectSeason', season);

            await context.dispatch('loadFromLocalStorage');
        },
        loadSchedule: async (context, {groupId, season}) => {
            context.commit('setSchedule', {data: null, error: null});

            const [schedule, error] = await getSchedule(groupId, season);
            context.commit('setSchedule', {data: schedule, error});

            if (!error) {
                context.commit('changeTitle', schedule['group']);
            }
        },
        loadFromLocalStorage: (context) => {
            const faculty = localStorage.getItem('faculty');
            const group = localStorage.getItem('group');

            if (faculty) {
                const facultyItem = (context.state.groups.data || []).find(item => item['faculty'] === faculty);

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
});
