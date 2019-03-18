<template>
    <div>
        <vsspinner v-bind:visible="state === STATES.LOADING"></vsspinner>
        <div v-if="state === STATES.ERROR" class="error-container">
            <error
                    class="error-column"
                    v-bind:title="error.title"
                    v-bind:message="error.message"
            ></error>
        </div>
        <div v-if="state === STATES.READY" class="schedule-container">
            <div class="schedule-column">
                <a id="top" class="anchor"></a>
                <h3 class="department-title">{{department}}</h3>
                <b-form-group>
                    <label>Выберите преподавателя</label>
                    <b-form-select v-model="selectedTeacher" class="mb-2">
                        <option
                                v-for="teacher_item in teachers"
                                v-bind:key="teacher_item['teacher']"
                                v-bind:value="teacher_item"
                        >{{ teacher_item['teacher'] }}
                        </option>
                    </b-form-select>
                </b-form-group>
                <div v-if="schedule">
                    <div v-for="(week, week_index) in schedule" v-bind:key="week" class="vs-schedule-week">
                        <div v-for="(day, day_index) in week" v-bind:key="day">
                            <div>
                                <span v-if="today[0] === week_index && today[1] === day_index">
                                    <a id="today" class="anchor"></a>
                                </span>
                                <h5 class="text-center mt-2 day-title">{{days[day_index]}}</h5>
                            </div>
                            <b-list-group>
                                <b-list-group-item
                                        v-for="(lesson, index) in day"
                                        v-bind:key="lesson"
                                        class="pl-2 pr-2"
                                >
                                    <h5 class="text-center lesson-title">{{calls[index][0] + ' - ' + calls[index][1]}}</h5>
                                    <p class="text-center mb-0 lesson-description">{{lesson !== '' ? lesson : '———'}}</p>
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                    </div>
                </div>
            </div>
            <div class="toolbar-column" v-if="schedule">
                <b-button-group>
                    <b-button
                            size="md"
                            v-scroll-to="'#today'"
                            variant="secondary"
                    >Сегодня</b-button>
                    <div class="splitter"></div>
                    <b-button
                            size="md"
                            v-scroll-to="'#top'"
                            variant="secondary"
                    >▲</b-button>
                </b-button-group>
            </div>
        </div>
    </div>
</template>

<script>
import {states} from '../utils/states';
import Error from './Error';
import Vsspinner from './VsSpinner';

export default {
    title: 'Преподаватели',
    name: 'departmentschedule',
    components: {
        error: Error,
        Vsspinner
    },
    data: function () {
        return {
            STATES: states,
            days: ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА']
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
    @import "../sass/common"

    .schedule-container
        display: grid
        grid-template-columns: 1fr 2fr 1fr
        grid-template-rows: auto
        align-items: start

    @include media-breakpoint-up(md)
        .schedule-column
            grid-column: 2 / 3

        .toolbar-column
            grid-column: 3 / 4
            align-self: end
            position: sticky
            bottom: 1em
            margin-left: 1em

    @include media-breakpoint-down(sm)
        .schedule-column
            grid-column: 1 / 4

        .toolbar-column
            position: fixed
            z-index: $zindex-fixed
            bottom: 1em
            right: 1em

    .error-container
        display: grid
        grid-template-rows: auto
        align-items: start

    .error-column
        padding: 1.2em

    @include media-breakpoint-up(md)
        .error-container
            grid-template-columns: 1fr 2fr 1fr

    @include media-breakpoint-between(xs, sm)
        .error-container
            grid-template-columns: 1fr 11fr 1fr

    @include media-breakpoint-up(sm)
        .error-column
            grid-column: 2 / 3

    @include media-breakpoint-down(xs)
        .error-column
            grid-column: 1 / 3

    div.vs-schedule-week:nth-of-type(odd) .list-group-item
        background-color: #fff1f1

    div.vs-schedule-week:nth-of-type(even) .list-group-item
        background-color: #fdfff1

    .lesson-description
        font-size: 0.9em
        line-height: 1.3em

    .lesson-title
        font-size: 1.1em

    .day-title
        font-weight: 700

    .department-title
        font-size: 1.5em
        text-align: center

    a.anchor
        display: block
        position: relative
        top: -($vs-navbar-height + 0.5em)
        visibility: hidden

    .splitter
        background-color: #5b5b5b
        width: 0.1rem
</style>