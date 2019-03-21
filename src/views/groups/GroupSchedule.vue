<template>
    <div>
        <anchor :id="'top'"></anchor>
        <loader v-if="state === STATES.LOADING"></loader>
        <div v-if="state === STATES.ERROR" class="error-container">
            <error
                    class="error-column"
                    v-bind:title="error.title"
                    v-bind:message="error.message"
            ></error>
        </div>
        <div v-if="state === STATES.READY" class="schedule-container">
            <div class="schedule-column">
                <schedule
                        :schedule="weeks"
                        :today="today"
                        :calls="calls"
                ></schedule>
            </div>
            <div class="toolbar-column">
                <toolbar></toolbar>
            </div>
        </div>
    </div>
</template>

<script>
import {states} from '../../utils/states';
import error from '../../components/Error';
import loader from '../../components/Loader';
import schedule from '../../components/Schedule';
import anchor from '../../components/Anchor';
import toolbar from '../../components/ToolBar';

export default {
    title: 'Расписание',
    name: 'groupschedule',
    components: {
        error,
        loader,
        schedule,
        anchor,
        toolbar
    },
    data: function () {
        return {
            STATES: states
        };
    },
    created: async function () {
        const groupId = this.$route.params['groupId'];
        const season = this.$route.params['season'];

        await this.$store.dispatch('schedule/loadGroupSchedule', {groupId, season});

        this.$title = this.group;
    },
    computed: {
        calls: function () {
            return this.state === states.READY ? this.$store.state.global.calls.data : [];
        },
        schedule: function () {
            return this.$store.state.schedule.group.data;
        },
        group: function () {
            return this.state === states.READY ? this.schedule['group'] : '';
        },
        weeks: function () {
            return this.state === states.READY ? this.schedule['weeks'] : [];
        },
        today: function () {
            if (this.state === states.READY) {
                const {week, dayOfWeek: day} = this.schedule['today'];
                return [week, day];
            } else {
                return [];
            }
        },
        error: function () {
            if (this.state === states.ERROR) {
                return {
                    title: 'Что-то пошло не так :(',
                    message: 'Возможно вы ошиблись группой или расписания на нужный семестр для вашей группы нет'
                };
            } else {
                return {};
            }
        },
        state: function () {
            const schedule = this.$store.state.schedule.group.data;
            const error = this.$store.state.schedule.group.error
                || this.$store.state.global.calls.error;

            if (!error && !schedule) {
                return states.LOADING;
            } else if (!error && schedule) {
                return states.READY;
            } else {
                return states.ERROR;
            }
        }
    }
};
</script>

<style scoped lang="sass">
    @import "../../sass/common"
    @import "../../sass/grids/schedule"
    @import "../../sass/grids/error"
</style>
