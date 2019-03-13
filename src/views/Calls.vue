<template>
    <div>
        <vsspinner v-bind:visible="state === STATES.LOADING"></vsspinner>
        <div v-if="state === STATES.READY" class="row justify-content-center">
            <b-list-group class="col-12 col-md-6">
                <b-list-group-item
                        v-for="(item, index) in calls"
                        class="pt-2 pb-2"
                        v-bind:key="index">
                    <h5 class="call-title">
                        {{ index + 1 + " пара" }}
                    </h5>
                    <p class="mb-0 call-time">
                        {{ item[0] + " - " + item[1] }}
                    </p>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
import {states} from '../utils/states';
import Vsspinner from '../components/VsSpinner';

export default {
    title: 'Звонки',
    name: 'calls',
    components: {
        Vsspinner
    },
    data: function () {
        return {
            STATES: states
        };
    },
    created: async function () {
        this.$store.commit('changeTitle', 'Звонки');
    },
    computed: {
        calls: function () {
            return this.state === states.READY ? this.$store.state.calls.data : [];
        },
        state: function () {
            const calls = this.$store.state.calls.data;
            const error = this.$store.state.calls.error;

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

    .call-title
        font-size: 1.1em

    .call-time
        font-size: 0.9em
        line-height: 1.3em
</style>