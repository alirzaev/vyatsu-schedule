import Vue from 'vue'

const API_URL = 'https://vsuscheduleapi-dev.herokuapp.com';

export async function getCalls() {
    try {
        const resp = await Vue.http.get(`${API_URL}/static/v1/calls.json`);

        return [resp.data, null];
    } catch (error) {
        return [null, error];
    }
}

export async function getGroups() {
    try {
        const resp = await Vue.http.get(`${API_URL}/static/v2/groups/by_faculty.json`);

        return [resp.data, null];
    } catch (error) {
        return [null, error];
    }
}

export async function getSchedule(groupId, season) {
    try {
        const resp = await Vue.http.get(`${API_URL}/vyatsu/schedule/${groupId}/${season}`);

        return [resp.data, null];
    } catch (error) {
        return [null, error];
    }
}
