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
                <h1 class="department-title">{{department}}</h1>
                <b-form-group>
                    <label>Выберите преподавателя</label>
                    <formselect
                            :items="teachers"
                            :field="'teacher'"
                            v-model="selectedTeacher"
                            class="mb-2"
                    ></formselect>
                </b-form-group>
                <schedule
                        v-if="schedule"
                        :schedule="schedule"
                        :calls="calls"
                        :today="today"
                ></schedule>
            </div>
            <div class="toolbar-column" v-if="schedule">
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
import formselect from '../../components/FormSelect';

export default {
    title: 'Преподаватели',
    name: 'departmentschedule',
    components: {
        error,
        loader,
        schedule,
        anchor,
        toolbar,
        formselect
    },
    data: function () {
        return {
            STATES: states
        };
    },
    created: async function () {
        const departmentId = this.$route.params['departmentId'];
        const season = this.$route.params['season'];

        await this
            .$store
            .dispatch('schedule/loadDepartmentSchedule', {departmentId, season});
    },
    computed: {
        selectedTeacher: {
            get: function () {
                return this
                    .$store
                    .state
                    .schedule
                    .department
                    .selectedTeacher;
            },
            set: function (value) {
                this.$store.commit('schedule/selectTeacher', value);
            }
        },
        calls: function () {
            if (this.state === states.READY) {
                return this.$store.state.global.calls.data;
            } else {
                return [];
            }
        },
        teachers: function () {
            if (this.state === states.READY) {
                return this
                    .$store
                    .state
                    .schedule
                    .department
                    .data['schedules'];
            }
            else {
                return [];
            }
        },
        schedule: function () {
            if (this.selectedTeacher) {
                return this.selectedTeacher['schedule'];
            } else {
                return null;
            }
        },
        department: function () {
            if (this.state === states.READY) {
                return this
                    .$store
                    .state
                    .schedule
                    .department
                    .data['department'];
            } else {
                return '';
            }
        },
        today: function () {
            if (this.state === states.READY) {
                const {week, dayOfWeek: day} = this
                    .$store
                    .state
                    .schedule
                    .department
                    .data['today'];
                return [week, day];
            } else {
                return [];
            }
        },
        error: function () {
            if (this.state === states.ERROR) {
                return {
                    title: 'Что-то пошло не так :(',
                    message: 'Похоже, такой кафедры нет'
                };
            } else {
                return {};
            }
        },
        state: function () {
            const schedule = this
                .$store
                .state
                .schedule
                .department
                .data;
            const error = this.$store.state.schedule.department.error
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

    .department-title
        font-size: 1.5em
        text-align: center
</style>
