<template>
    <div class="container">
        <b-list-group>
            <b-list-group-item v-for="(item, index) in calls" class="pt-2 pb-2">
                <h5 class="calls">{{ index + 1 + " пара" }}</h5>
                <p class="mb-0 calls-description">{{ item[0] + " - " + item[1] }}</p>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    import {getCalls} from "../utils/api";

    export default {
        name: "Calls",
        data: function () {
            return {
                calls: []
            }
        },
        created: async function () {
            this.$store.commit('changeTitle', 'Звонки');

            const [calls, error2] = await getCalls();

            this.calls = calls;
        }
    }
</script>

<style scoped>
    .calls {
        font-size: 18px;
    }

    .calls-description {
        font-size: 14px;
        line-height: 18.2px;
    }
</style>