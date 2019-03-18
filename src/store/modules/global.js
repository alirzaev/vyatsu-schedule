import {getCalls, getSeason} from '../../utils/api';

export default {
    state: {
        navbarTitle: '',
        calls: {
            data: null,
            error: null
        },
        season: null
    },
    mutations: {
        changeTitle: (state, title) => {
            state.navbarTitle = title;
        },
        setCalls: (state, {data, error}) => {
            state.calls.data = data;
            state.calls.error = error;
        },
        setSeason: (state, season) => {
            state.season = season;
        }
    },
    actions: {
        init: async (context) => {
            const calls = await getCalls();
            context.commit('setCalls', {data: calls[0], error: calls[1]});

            const season = await getSeason();
            context.commit('setSeason', season);

            context.commit('groups/selectSeason', season);
        }
    }
};
