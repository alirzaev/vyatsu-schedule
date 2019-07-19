import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || '';

export async function getCalls() {
    try {
        const resp = await axios.get(`${API_URL}/api/v1/calls`);

        return [resp.data, null];
    } catch (error) {
        return [null, error];
    }
}

export async function getGroups() {
    try {
        const resp = await axios.get(`${API_URL}/api/v2/groups/by_faculty`);

        return [resp.data, null];
    } catch (error) {
        return [null, error];
    }
}

export async function getDepartments() {
    try {
        const resp = await axios.get(`${API_URL}/api/v2/departments/by_faculty`);

        return [resp.data, null];
    } catch (error) {
        return [null, error];
    }
}

export async function getSchedule(groupId, season) {
    try {
        const resp = await axios.get(`${API_URL}/api/v2/schedule/${groupId}/${season}`);

        return [resp.data, null];
    } catch (error) {
        return [null, error];
    }
}

export async function getDepartmentSchedule(departmentId, season) {
    try {
        const resp = await axios.get(`${API_URL}/api/v2/department/${departmentId}/${season}`);

        return [resp.data, null];
    } catch (error) {
        return [null, error];
    }
}

export async function getSeason() {
    try {
        const resp = await axios.get(`${API_URL}/api/v2/season/current`);

        return resp.data['season'];
    } catch (error) {
        return 'autumn';
    }
}
