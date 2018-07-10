<template>
    <div>
        <div class="container"
             style="padding: 19px;"
             v-if="ready && !scheduleOk">
            <error v-bind:title="error.title" v-bind:message="error.message"></error>
        </div>
        <div v-if="!ready" class="vsu-splashscreen">
            <spinner></spinner>
        </div>
        <div v-if="ready && scheduleOk">
            <!--<b-navbar fixed="top" variant="light" class="vsu-navbar-shadow">-->
                <!--<b-navbar-brand>-->
                    <!--{{group}}-->
                <!--</b-navbar-brand>-->
                <!--<b-navbar-nav class="ml-auto">-->
                    <!--<b-button size="sm" v-scroll-to="'#today'" variant="outline-secondary">Сегодня</b-button>-->
                <!--</b-navbar-nav>-->
            <!--</b-navbar>-->
            <div class="container">
                <div v-for="(week, week_index) in weeks" v-bind:key="week">
                    <div v-for="(day, day_index) in week" v-bind:key="day">
                        <h5 class="text-center mt-2">
                        <span v-if="today[0] === week_index && today[1] === day_index">
                            <a id="today" class="anchor"></a>
                        </span>
                            <b>{{days[day_index]}}</b>
                        </h5>
                        <b-list-group>
                            <b-list-group-item
                                    v-for="(lesson, index) in day"
                                    v-bind:key="lesson"
                                    class="pl-2, pr-2"
                                    v-bind:class="{
                            'vsu-schedule-item-odd': week_index % 2 === 0,
                            'vsu-schedule-item-even': week_index % 2 !== 0
                        }">
                                <h5 class="text-center calls">{{calls[index][0] + ' - ' + calls[index][1]}}</h5>
                                <p class="text-center mb-0 lesson-description">{{lesson !== '' ? lesson : '———'}}</p>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getSchedule, getCalls} from '../utils/api';
import {getCurrentDay} from '../utils/date';
import Spinner from 'vue-simple-spinner';
import Error from './Error';

export default {
    name: 'schedule',
    components: {
        spinner: Spinner,
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
        const group_id = this.$route.params.groupId;
        const season = this.$route.params.season;

        const [schedule, error1] = await getSchedule(group_id, season);
        const [calls, error2] = await getCalls();

        if (error1 == null && error2 == null) {
            const date_range = schedule.date_range;

            this.weeks = schedule.weeks;
            this.calls = calls;
            this.group = schedule.group;
            this.today = getCurrentDay(date_range[0], date_range[1]);

            this.$store.commit('changeTitle', this.group);
        } else if (error1 == null) {
            this.error.title = 'Что-то пошло не так :(';
            this.error.message = 'Нам не удалось загрузить расписание, попробуйте обновить страницу';
        } else {
            this.error.title = 'Что-то пошло не так :(';
            this.error.message = 'Возможно вы ошиблись группой или расписания на нужный семестр для вашей группы нет';
        }

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

<style scoped>
    .vsu-splashscreen {
        text-align: center;
        margin-top: 50px;
        display: block;
    }

    .vsu-schedule-item-odd {
        background-color: #fff1f1;
    }

    .vsu-schedule-item-even {
        background-color: #fdfff1;
    }

    .vsu-navbar-shadow {
        box-shadow: 0 2px 2px 0 #cccccc;
    }

    .lesson-description {
        font-size: 14px;
        line-height: 18.2px;
    }

    .calls {
        font-size: 18px;
    }

    a.anchor {
        display: block;
        position: relative;
        top: -70px;
        visibility: hidden;
    }
</style>