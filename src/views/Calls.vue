<template>
    <div>
        <div v-if="!ready" class="vs-spinner">
            <spinner></spinner>
        </div>
        <div v-if="ready">
            <div class="row justify-content-center">
            <b-list-group class="col-12 col-sm-11 col-md-6 col-lg-6">
                <b-list-group-item v-for="(item, index) in calls" class="pt-2 pb-2" v-bind:key="item">
                    <h5 class="calls">{{ index + 1 + " пара" }}</h5>
                    <p class="mb-0 calls-description">{{ item[0] + " - " + item[1] }}</p>
                </b-list-group-item>
            </b-list-group>
            </div>
        </div>
    </div>
</template>

<script>
import {getCalls} from '../utils/api';
import Spinner from 'vue-simple-spinner';

export default {
    name: 'Calls',
    components: {
        spinner: Spinner
    },
    data: function () {
        return {
            calls: [],
            ready: false
        };
    },
    created: async function () {
        this.$store.commit('changeTitle', 'Звонки');

        const [calls, error2] = await getCalls();

        this.calls = calls;
        this.ready = true;
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    .calls
        font-size: 18px

    .calls-description
        font-size: 14px
        line-height: 1.3em
</style>