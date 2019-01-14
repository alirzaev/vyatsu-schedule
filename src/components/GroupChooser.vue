<template>
    <div>
        <vsspinner v-bind:visible="state === STATES.LOADING"></vsspinner>
        <div v-if="state === STATES.READY" class="row justify-content-center">
            <div class="col-12 col-md-6">
                <b-form-group>
                    <label>Выберите факультет</label>
                    <b-form-select v-model="selectedFaculty" class="mb-2" v-on:change="resetGroup()">
                        <option
                                v-for="faculty_item in groups"
                                v-bind:key="faculty_item['faculty']"
                                v-bind:value="faculty_item"
                        >{{ faculty_item['faculty'] }}
                        </option>
                    </b-form-select>

                    <label>Выберите группу</label>
                    <b-form-select v-model="selectedGroup" class="mb-3">
                        <option
                                v-for="group_item in facultyGroups"
                                v-bind:key="group_item['name']"
                                v-bind:value="group_item"
                        >{{ group_item['name'] }}
                        </option>
                    </b-form-select>

                    <b-form-radio-group
                            v-model="selectedSeason"
                            class="w-100"
                            buttons
                            button-variant="primary">
                        <b-form-radio
                                v-for="season in seasons"
                                v-bind:key="season['text']"
                                v-bind:value="season['value']"
                                class="w-100"
                        >{{ season.text }}
                        </b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <b-button
                        variant="success"
                        v-on:click="openGroupSchedule"
                        :disabled="!isGroupSelected"
                        class="w-100 mt-0"
                >Открыть расписание
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import {getCalls, getGroups, getSeason} from '../utils/api';
import {states} from '../utils/states';
import Vsspinner from './VsSpinner';

export default {
    title: 'Расписание',
    name: 'groupchooser',
    components: {
        Vsspinner
    },
    data: function () {
        return {
            STATES: states,
            state: states.LOADING,
            selectedGroup: null,
            selectedFaculty: null,
            selectedSeason: null,
            seasons: [
                {text: 'Осень', value: 'autumn'},
                {text: 'Весна', value: 'spring'}
            ],
            calls: [],
            groups: []
        };
    },
    created: async function () {
        this.$store.commit('changeTitle', 'Расписание');
        this.state = states.LOADING;

        const [calls, error1] = await getCalls();
        const [groups, error2] = await getGroups();
        const season = await getSeason();

        if (error1 == null && error2 == null) {
            this.state = states.READY;
            this.calls = calls;
            this.groups = groups.sort((a, b) => a['faculty'].localeCompare(b['faculty']));

            const [savedFaculty, savedGroup] = this.loadFromLocalStorage();
            this.selectedFaculty = savedFaculty;
            this.selectedGroup = savedGroup;
        }

        this.selectedSeason = season === 'autumn' ? this.seasons[0].value : this.seasons[1].value;
    },
    methods: {
        openGroupSchedule: function () {
            const groupID = this.selectedGroup['id'];
            const url = `/schedule/${groupID}/${this.selectedSeason}`;
            this.saveToLocalStorage(this.selectedFaculty['faculty'], this.selectedGroup['name']);
            this.$router.push(url);
        },
        resetGroup: function () {
            this.selectedGroup = null;
        },
        saveToLocalStorage: function (faculty, group) {
            localStorage.setItem('faculty', faculty);
            localStorage.setItem('group', group);
        },
        loadFromLocalStorage: function () {
            const faculty = localStorage.getItem('faculty');
            const group = localStorage.getItem('group');

            if (faculty) {
                const facultyItem = this.groups.find(item => item['faculty'] === faculty);

                if (facultyItem && group) {
                    const groupItem = facultyItem['groups'].find(item => item['name'] === group);

                    return [facultyItem, groupItem];
                } else {
                    return [facultyItem, null];
                }
            } else {
                return [null, null];
            }
        }
    },
    computed: {
        facultyGroups: function () {
            return this.selectedFaculty ? this.selectedFaculty['groups'] : [];
        },
        isGroupSelected: function () {
            return this.selectedGroup !== null && this.selectedGroup !== undefined;
        }
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"
</style>
