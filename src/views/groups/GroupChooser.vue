<template>
    <div>
        <loader v-if="state === STATES.LOADING"></loader>
        <div v-if="state === STATES.READY" class="standard-container">
            <div class="content-column">
                <b-form-group>
                    <label>Выберите факультет</label>
                    <formselect
                            :items="groups"
                            :field="'faculty'"
                            v-model="selectedFaculty"
                            class="mb-2"
                    ></formselect>

                    <label>Выберите группу</label>
                    <formselect
                        :items="facultyGroups"
                        :field="'name'"
                        v-model="selectedGroup"
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
                        v-on:click="openGroupSchedule"
                        :disabled="!isGroupSelected"
                        class="w-100 mt-0"
                >Открыть расписание</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import {states} from '../../utils/states';
import loader from '../../components/Loader';
import formselect from '../../components/FormSelect';

export default {
    title: 'Расписание',
    name: 'groupchooser',
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
        this.$store.commit('setTitle', 'Расписание');
        await this.$store.dispatch('groups/init');
    },
    methods: {
        openGroupSchedule: async function () {
            const groupID = this.selectedGroup['id'];
            const url = `/schedule/${groupID}/${this.selectedSeason}`;
            await this.$store.dispatch('groups/saveToLocalStorage');
            this.$router.push(url);
        }
    },
    computed: {
        selectedFaculty: {
            get: function () {
                return this.$store.state.groups.selectedFaculty;
            },
            set: function (value) {
                this.$store.commit('groups/selectFaculty', value);
            }
        },
        selectedGroup: {
            get: function () {
                return this.$store.state.groups.selectedGroup;
            },
            set: function (value) {
                this.$store.commit('groups/selectGroup', value);
            }
        },
        selectedSeason: {
            get: function () {
                return this.$store.state.groups.selectedSeason;
            },
            set: function (value) {
                this.$store.commit('groups/selectSeason', value);
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
            const groups = this.$store.state.groups.data;

            if (!error && !groups) {
                return states.LOADING;
            } else if (!error && groups) {
                return states.READY;
            } else {
                return states.ERROR;
            }
        },
        groups: function () {
            return this.$store.state.groups.data || [];
        }
    }
};
</script>

<style scoped lang="sass">
    @import "../../sass/common"
    @import "../../sass/grids/standard"
</style>
