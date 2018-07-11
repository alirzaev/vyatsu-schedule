<template>
    <div>
        <div class="row justify-content-center">
            <error
                    class="col-11 col-md-6 error-alert"
                    v-bind:title="error.title"
                    v-bind:message="error.message"
                    v-bind:visible="ready && !scheduleOk"
            ></error>
        </div>
        <div v-if="ready && scheduleOk" class="row justify-content-center">
            <div class="col-12 col-md-6">
                <div v-for="(week, week_index) in weeks" v-bind:key="week">
                    <div v-for="(day, day_index) in week" v-bind:key="day">
                        <div>
                            <span v-if="today[0] === week_index && today[1] === day_index">
                                <a id="today" class="anchor"></a>
                            </span>
                            <h5 class="text-center mt-2">
                                <b>{{days[day_index]}}</b>
                            </h5>
                        </div>
                        <b-list-group>
                            <b-list-group-item
                                    v-for="(lesson, index) in day"
                                    v-bind:key="lesson"
                                    class="pl-2, pr-2"
                                    v-bind:class="{
                            'vsu-schedule-item-odd': week_index % 2 === 0,
                            'vsu-schedule-item-even': week_index % 2 !== 0
                        }">
                                <h5 class="text-center call-title">{{calls[index][0] + ' - ' + calls[index][1]}}</h5>
                                <p class="text-center mb-0 lesson-description">{{lesson !== '' ? lesson : '———'}}</p>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
            <b-button
                    size="sm"
                    v-scroll-to="'#today'"
                    variant="secondary"
                    class="position-fixed today-button"
            >
                Сегодня
            </b-button>
        </div>
    </div>
</template>

<script>
import {getSchedule, getCalls} from '../utils/api';
import Error from './Error';

export default {
    name: 'schedule',
    components: {
        error: Error
    },
    data: function () {
        return {
            weeks: [],
            calls: [],
            group: '',
            today: [],
            days: ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА'],
            error: {},
            ready: false
        };
    },
    created: async function () {
        this.$store.commit('showSpinner');

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
        } else if (error1 == null) {
            this.error.title = 'Что-то пошло не так :(';
            this.error.message = 'Нам не удалось загрузить расписание, попробуйте обновить страницу';
        } else {
            this.error.title = 'Что-то пошло не так :(';
            this.error.message = 'Возможно вы ошиблись группой или расписания на нужный семестр для вашей группы нет';
        }

        this.$store.commit('hideSpinner');
        this.ready = true;
    },
    computed: {
        scheduleOk: function () {
            return [
                this.weeks,
                this.calls,
                this.group,
                this.today
            ].every(item => item); // item => item != false
        }
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    .vsu-schedule-item-odd
        background-color: #fff1f1

    .vsu-schedule-item-even
        background-color: #fdfff1

    .lesson-description
        font-size: 14px
        line-height: 1.3em

    .call-title
        font-size: 18px

    .error-alert
        padding: 1.2em

    a.anchor
        display: block
        position: relative
        top: -($vs-navbar-height + 0.5em)
        visibility: hidden

    .today-button
        display: block
        z-index: $zindex-sticky

    @include media-breakpoint-down(md)
        .today-button
            bottom: 1em
            right: 1em

    @include media-breakpoint-up(md)
        .today-button
            display: none
</style>