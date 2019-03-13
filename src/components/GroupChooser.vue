<template>
    <div>
        <vsspinner v-bind:visible="state === STATES.LOADING"></vsspinner>
        <div v-if="state === STATES.READY" class="row justify-content-center">
            <div class="col-12 col-md-6">
                <b-form-group>
                    <label>Выберите факультет</label>
                    <b-form-select v-model="selectedFaculty" class="mb-2">
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
            seasons: [
                {text: 'Осень', value: 'autumn'},
                {text: 'Весна', value: 'spring'}
            ]
        };
    },
    created: async function () {
        this.$store.commit('changeTitle', 'Расписание');
    },
    methods: {
        openGroupSchedule: async function () {
            const groupID = this.selectedGroup['id'];
            const url = `/schedule/${groupID}/${this.selectedSeason}`;
            await this.$store.dispatch('saveToLocalStorage');
            this.$router.push(url);
        }
    },
    computed: {
        selectedFaculty: {
            get: function () {
                return this.$store.state.selectedFaculty;
            },
            set: function (value) {
                this.$store.commit('selectFaculty', value);
            }
        },
        selectedGroup: {
            get: function () {
                return this.$store.state.selectedGroup;
            },
            set: function (value) {
                this.$store.commit('selectGroup', value);
            }
        },
        selectedSeason: {
            get: function () {
                return this.$store.state.selectedSeason;
            },
            set: function (value) {
                this.$store.commit('selectSeason', value);
            }
        },
        isGroupSelected: function () {
            return this.selectedGroup !== null;
        },
        facultyGroups: function () {
            return this.selectedFaculty ? this.selectedFaculty['groups'] : [];
        },
        state: function () {
            const error = this.$store.state.groups.error;

            if (error === null) {
                return states.READY;
            } else {
                return states.LOADING;
            }
        },
        groups: function () {
            return this.$store.state.groups.data || [];
        }
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"
</style>
