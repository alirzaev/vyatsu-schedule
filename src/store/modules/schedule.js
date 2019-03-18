import {getSchedule} from '../../utils/api';

export default {
    namespaced: true,
    state: {
        data: null,
        error: null

    },
    mutations: {
        setData: (state, {data, error}) => {
            state.data = data;
            state.error = error;
        }
    },
    actions: {
        loadSchedule: async (context, {groupId, season}) => {
            context.commit('setData', {data: null, error: null});

            const [data, error] = await getSchedule(groupId, season);
            context.commit('setData', {data, error});

            if (!error) {
                context.commit('changeTitle', data['group'], { root: true });
            }
        }
    }
};