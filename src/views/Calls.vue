<template>
    <div v-if="ready" class="row justify-content-center">
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
</template>

<script>
import {getCalls} from '../utils/api';

export default {
    name: 'calls',
    data: function () {
        return {
            calls: [],
            ready: false
        };
    },
    created: async function () {
        this.$store.commit('changeTitle', 'Звонки');
        this.$store.commit('showSpinner');

        const [calls, error2] = await getCalls();

        this.calls = calls;

        this.$store.commit('hideSpinner');
        this.ready = true;
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