<template>
    <div>
        <div v-if="!ready" class="vsu-splashscreen">
            <spinner></spinner>
        </div>
        <div v-if="ready">
            <b-navbar fixed="top" variant="light" class="vsu-navbar-shadow">
                <b-navbar-brand>
                    {{group}}
                </b-navbar-brand>
                <b-navbar-nav class="ml-auto">
                    <b-button size="sm" v-scroll-to="'#today'" variant="outline-secondary">Сегодня</b-button>
                </b-navbar-nav>
            </b-navbar>
            <div class="schedule container">
                <div v-for="(week, week_index) in weeks">
                    <div v-for="(day, day_index) in week">
                        <h5 class="text-center mt-2">
                        <span v-if="today[0] === week_index && today[1] === day_index">
                            <a id="today" class="anchor"></a>
                        </span>
                            <b>{{days[day_index]}}</b>
                        </h5>
                        <b-list-group>
                            <b-list-group-item
                                    v-for="(lesson, index) in day"
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
    import { getSchedule, getCalls } from "../utils/api";
    import Spinner from 'vue-simple-spinner'

    function parseDate(date) {
        let day = Number.parseInt(date.slice(0, 2));
        let month = Number.parseInt(date.slice(2, 4));
        let year = Number.parseInt(date.slice(4));

        return [day, month, year]
    }

    function getCurrentDay(firstDate, secondDate) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const OFFSET_MSK = 10800000;
        const MODULO = 1209600000;
        const DAY_IN_MILLISEC = 24 * 3600 * 1000;

        const [fDay, fMonth, fYear] = parseDate(firstDate);
        const [sDay, sMonth, sYear] = parseDate(secondDate);

        firstDate = Date.parse(`${fDay} ${monthNames[fMonth - 1]} ${fYear} 00:00:00 +0300`);
        secondDate = Date.parse(`${sDay} ${monthNames[sMonth - 1]} ${sYear} 00:00:00 +0300`);

        const currentDate = Date.now() + OFFSET_MSK;

        const difference = ((currentDate - firstDate + MODULO) % MODULO) / DAY_IN_MILLISEC >> 0;
        const cWeek = (difference / 7) >> 0;
        const cDay = difference % 7;

        if (cWeek < 0 || cWeek > 1 || cDay > 5 || cDay < 0) {
            return [-1, -1]
        } else {
            return [cWeek, cDay]
        }
    }

    export default {
        name: 'schedule',
        components: {
            spinner: Spinner
        },
        data: function () {
            return {
                weeks: [],
                calls: [],
                group: '',
                today: [],
                days: ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА'],
                ready: false
            }
        },
        created: async function () {
            const group_id = this.$route.params.groupId;
            const season = this.$route.params.season;

            const [schedule, error1] = await getSchedule(group_id, season);
            const [calls, error2] = await getCalls();

            const date_range = schedule.date_range;

            this.weeks = schedule.weeks;
            this.calls = calls;
            this.group = schedule.group;
            this.today = getCurrentDay(date_range[0], date_range[1]);

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

    .schedule {
        padding-top: 60px;
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