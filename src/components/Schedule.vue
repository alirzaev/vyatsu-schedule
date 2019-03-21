<template>
    <div>
        <div
                v-for="(week, week_index) in schedule"
                :key="week"
                class="week-item"
        >
            <div v-for="(day, day_index) in week" :key="day">
                <anchor
                        v-if="today[0] === week_index && today[1] === day_index"
                        :id="'today'"
                ></anchor>
                <h5 class="day-title">{{days[day_index]}}</h5>
                <b-list-group>
                    <b-list-group-item
                            v-for="(lesson, index) in day"
                            :key="lesson"
                            class="lesson-item"
                    >
                        <h5 class="lesson-title"
                        >{{calls[index][0] + ' - ' + calls[index][1]}}</h5>
                        <p class="lesson-description"
                        >{{lesson !== '' ? lesson : '———'}}</p>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </div>
    </div>
</template>

<script>
import anchor from './Anchor';

export default {
    name: 'schedule',
    components: {
        anchor
    },
    props: ['schedule', 'today', 'calls'],
    data: function () {
        return {
            days: [
                'ПОНЕДЕЛЬНИК',
                'ВТОРНИК',
                'СРЕДА',
                'ЧЕТВЕРГ',
                'ПЯТНИЦА',
                'СУББОТА'
            ]
        };
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    div.week-item:nth-of-type(odd) .list-group-item
        background-color: #fff1f1

    div.week-item:nth-of-type(even) .list-group-item
        background-color: #fdfff1

    .lesson-item
        padding: auto 0.5em

    .lesson-description
        font-size: 0.9em
        line-height: 1.3em
        margin-bottom: 0
        text-align: center

    .lesson-title
        font-size: 1.1em
        text-align: center

    .day-title
        font-weight: 700
        margin-top: 0.5em
        text-align: center
</style>
