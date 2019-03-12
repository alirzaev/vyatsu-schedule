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
                <div v-for="(week, week_index) in weeks" v-bind:key="week" class="vs-schedule-week">
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
            <div class="toolbar-column">
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
import {getSchedule, getCalls} from '../utils/api';
import {states} from '../utils/states';
import Error from './Error';
import Vsspinner from './VsSpinner';

export default {
    title: 'Расписание',
    name: 'schedule',
    components: {
        error: Error,
        Vsspinner
    },
    data: function () {
        return {
            STATES: states,
            state: states.LOADING,
            weeks: [],
            calls: [],
            group: '',
            today: [],
            days: ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА'],
            error: {}
        };
    },
    created: async function () {
        this.state = states.LOADING;

        const group_id = this.$route.params.groupId;
        const season = this.$route.params.season;

        const [schedule, error1] = await getSchedule(group_id, season);
        const [calls, error2] = await getCalls();

        if (error1 == null && error2 == null) {
            const {week, dayOfWeek: day} = schedule.today;

            this.weeks = schedule.weeks;
            this.calls = calls;
            this.group = schedule.group;
            this.today = [week, day];

            this.$store.commit('changeTitle', this.group);
            this.$title = this.group;

            this.state = states.READY;
        } else if (error1 == null) {
            this.error.title = 'Что-то пошло не так :(';
            this.error.message = 'Нам не удалось загрузить расписание, попробуйте обновить страницу';

            this.state = states.ERROR;
        } else {
            this.error.title = 'Что-то пошло не так :(';
            this.error.message = 'Возможно вы ошиблись группой или расписания на нужный семестр для вашей группы нет';

            this.state = states.ERROR;
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

    div.vs-schedule-week:nth-child(even) .list-group-item
        background-color: #fff1f1

    div.vs-schedule-week:nth-child(odd) .list-group-item
        background-color: #fdfff1

    .lesson-description
        font-size: 0.9em
        line-height: 1.3em

    .lesson-title
        font-size: 1.1em

    .day-title
        font-weight: 700

    a.anchor
        display: block
        position: relative
        top: -($vs-navbar-height + 0.5em)
        visibility: hidden

    .splitter
        background-color: #5b5b5b
        width: 0.1rem
</style>