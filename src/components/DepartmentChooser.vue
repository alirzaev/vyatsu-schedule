<template>
    <div>
        <vsspinner v-bind:visible="state === STATES.LOADING"></vsspinner>
        <div v-if="state === STATES.READY" class="row justify-content-center">
            <div class="col-12 col-md-6">
                <b-form-group>
                    <label>Выберите факультет</label>
                    <b-form-select v-model="selectedFaculty" class="mb-2">
                        <option
                                v-for="faculty_item in departments"
                                v-bind:key="faculty_item['faculty']"
                                v-bind:value="faculty_item"
                        >{{ faculty_item['faculty'] }}
                        </option>
                    </b-form-select>

                    <label>Выберите кафедру</label>
                    <b-form-select v-model="selectedDepartment" class="mb-3">
                        <option
                                v-for="dep_item in facultyDepartments"
                                v-bind:key="dep_item['name']"
                                v-bind:value="dep_item"
                        >{{ dep_item['name'] }}
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
                        v-on:click="openDepartmentSchedule"
                        :disabled="!isDepartmentSelected"
                        class="w-100 mt-0"
                >Открыть расписание кафедры
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import {states} from '../utils/states';
import Vsspinner from './VsSpinner';

export default {
    title: 'Преподаватели',
    name: 'DepartmentChooser',
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
        this.$store.commit('changeTitle', 'Преподаватели');
        await this.$store.dispatch('departments/init');
    },
    methods: {
        openDepartmentSchedule: async function () {
            const departmentID = this.selectedDepartment['id'];
            const url = `/department/${departmentID}/${this.selectedSeason}`;
            this.$router.push(url);
        }
    },
    computed: {
        selectedFaculty: {
            get: function () {
                return this.$store.state.departments.selectedFaculty;
            },
            set: function (value) {
                this.$store.commit('departments/selectFaculty', value);
            }
        },
        selectedDepartment: {
            get: function () {
                return this.$store.state.departments.selectedDepartment;
            },
            set: function (value) {
                this.$store.commit('departments/selectDepartment', value);
            }
        },
        selectedSeason: {
            get: function () {
                return this.$store.state.departments.selectedSeason;
            },
            set: function (value) {
                this.$store.commit('departments/selectSeason', value);
            }
        },
        isDepartmentSelected: function () {
            return this.selectedDepartment !== null;
        },
        facultyDepartments: function () {
            return this.selectedFaculty ? this.selectedFaculty['departments'] : [];
        },
        state: function () {
            const error = this.$store.state.departments.error;

            if (error === null) {
                return states.READY;
            } else {
                return states.LOADING;
            }
        },
        departments: function () {
            return this.$store.state.departments.data || [];
        }
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"
</style>