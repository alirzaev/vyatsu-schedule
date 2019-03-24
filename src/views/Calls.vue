<template>
    <div>
        <loader v-if="state === STATES.LOADING"></loader>
        <div v-if="state === STATES.READY" class="standard-container">
            <b-list-group class="content-column">
                <b-list-group-item
                        v-for="(item, index) in calls"
                        class="call-item"
                        v-bind:key="index">
                    <h5 class="call-title">
                        {{ index + 1 + " пара" }}
                    </h5>
                    <p class="call-description">
                        {{ item[0] + " - " + item[1] }}
                    </p>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
import {states} from '../utils/states';
import loader from '../components/Loader';

export default {
    title: 'Звонки',
    name: 'calls',
    components: {
        loader
    },
    data: function () {
        return {
            STATES: states
        };
    },
    created: async function () {
        this.$store.commit('setTitle', 'Звонки');
    },
    computed: {
        calls: function () {
            return this.state === states.READY ? this.$store.state.global.calls.data : [];
        },
        state: function () {
            const calls = this.$store.state.global.calls.data;
            const error = this.$store.state.global.calls.error;

            if (!error && calls) {
                return states.READY;
            } else {
                return states.LOADING;
            }
        }
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"
    @import "../sass/grids/standard"

    .call-item
        padding-top: 0.5em
        padding-bottom: 0.5em

    .call-title
        font-size: 1.1em

    .call-description
        font-size: 0.9em
        line-height: 1.3em
        margin-bottom: 0
</style>
