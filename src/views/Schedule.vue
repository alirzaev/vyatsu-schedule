<template>
    <div class="schedule">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid vsu-navbar-shadow">
                <div class="navbar-header">
                    <h3 class="text-center">
                        <a href="#today">{{groupName}}</a>
                    </h3>
                </div>
            </div>
        </nav>
        <div class="container">
            <div v-for="(week, week_index) in weeks">
                <div v-for="(day, day_index) in week">
                    <h4 class="text-center">
                        <b>{{day_index}}</b>
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

    export default {
        name: 'schedule',
        data: function () {
            return {
                weeks: [],
                calls: [],
                groupId: this.$route.params.groupId,
                season: this.$route.params.season,
                groupName: ''
            }
        },
        created: async function () {
            const weeks_res = await this.$http.get(`https://vyatsuscheduleapi.herokuapp.com/vyatsu/schedule/${this.groupId}/${this.season}`);
            const calls_res = await this.$http.get('/vyatsu/calls.json');

            this.weeks = weeks_res.data.weeks;
            this.calls = calls_res.data;
            this.groupName = weeks_res.data.group;
        }
    }
</script>

<style>
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