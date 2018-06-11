<template>
    <div>
        <div v-if="!ready" class="vsu-splashscreen">
            <spinner></spinner>
        </div>
        <div v-if="ready" class="container">
            <b-list-group>
                <b-list-group-item v-for="(item, index) in calls" class="pt-2 pb-2">
                    <h5 class="calls">{{ index + 1 + " пара" }}</h5>
                    <p class="mb-0 calls-description">{{ item[0] + " - " + item[1] }}</p>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
    import {getCalls} from "../utils/api";
    import Spinner from 'vue-simple-spinner'

    export default {
        name: "Calls",
        components: {
            spinner: Spinner
        },
        data: function () {
            return {
                calls: [],
                ready: false
            }
        },
        created: async function () {
            this.$store.commit('changeTitle', 'Звонки');

            const [calls, error2] = await getCalls();

            this.calls = calls;
            this.ready = true;
        }
    }
</script>

<style scoped>
    .vsu-splashscreen {
        text-align: center;
        margin-top: 50px;
        display: block;
    }

    .calls {
        font-size: 18px;
    }

    .calls-description {
        font-size: 14px;
        line-height: 18.2px;
    }
</style>