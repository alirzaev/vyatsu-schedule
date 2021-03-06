<template>
    <div>
        <loader v-if="state === STATES.LOADING"></loader>
        <div v-if="state === STATES.READY" class="standard-container">
            <div class="content-column">
                <b-form-group>
                    <label>Выберите факультет</label>
                    <formselect
                            :items="departments"
                            :field="'faculty'"
                            v-model="selectedFaculty"
                            class="mb-2"
                    ></formselect>

                    <label>Выберите кафедру</label>
                    <formselect
                            :items="facultyDepartments"
                            :field="'name'"
                            v-model="selectedDepartment"
                            class="mb-3"
                    ></formselect>

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
                        >{{ season.text }}</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <b-button
                        variant="success"
                        v-on:click="openDepartmentSchedule"
                        :disabled="!isDepartmentSelected"
                        class="w-100 mt-0"
                >Открыть расписание кафедры</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import {states} from '../../utils/states';
import loader from '../../components/Loader';
import formselect from '../../components/FormSelect';

export default {
    title: 'Преподаватели',
    name: 'departmentchooser',
    components: {
        loader,
        formselect
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
        this.$store.commit('setTitle', 'Преподаватели');
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
            const departments = this.$store.state.departments.data;

            if (!error && !departments) {
                return states.LOADING;
            } else if (!error && departments) {
                return states.READY;
            } else {
                return states.ERROR;
            }
        },
        departments: function () {
            return this.$store.state.departments.data || [];
        }
    }
};
</script>

<style scoped lang="sass">
    @import "../../sass/common"
    @import "../../sass/grids/standard"
</style>
