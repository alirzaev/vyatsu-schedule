<template>
    <div v-if="ready">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid vsu-navbar-shadow">
                <div class="navbar-header">
                    <h3 class="text-center">
                        <a href="#today">{{group}}</a>
                    </h3>
                </div>
            </div>
        </nav>
        <div class="schedule container">
            <div v-for="(week, week_index) in weeks">
                <div v-for="(day, day_index) in week">
                    <h4 class="text-center">
                        <span v-if="today[0] === week_index && today[1] === day_index">
                            <a id="today" class="anchor"></a>
                        </span>
                        <b>{{days[day_index]}}</b>
                    </h4>
                    <div class="list-group">
                        <div class="list-group-item" v-for="(lesson, index) in day"
                             v-bind:class="{
                                'vsu-schedule-item-odd': week_index % 2 === 0,
                                'vsu-schedule-item-even': week_index % 2 !== 0
                             }">
                            <div>
                                <h4 class="text-center list-group-item-heading">{{calls[index][0] + ' - ' + calls[index][1]}}</h4>
                                <p class="text-center list-group-item-text">{{lesson !== '' ? lesson : '———'}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

    const API_URL = 'https://vsuscheduleapi-dev.herokuapp.com';

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

            const weeks_res = await this.$http.get(`${API_URL}/vyatsu/schedule/${group_id}/${season}`);
            const calls_res = await this.$http.get(`${API_URL}/vyatsu/calls`);

            const date_range = weeks_res.data.date_range;

            this.weeks = weeks_res.data.weeks;
            this.calls = calls_res.data;
            this.group = weeks_res.data.group;
            this.today = getCurrentDay(date_range[0], date_range[1]);

            this.ready = true;
        }
    }
</script>

<style scoped>
    .schedule {
        padding-top: 70px;
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

    a.anchor {
        display: block;
        position: relative;
        top: -70px;
        visibility: hidden;
    }

    a {
        color: #333 !important;
        text-decoration: none !important;
    }
</style>