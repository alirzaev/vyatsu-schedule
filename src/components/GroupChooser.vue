<template>
    <div v-if="ready" class="row justify-content-center">
        <div class="col-12 col-sm-11 col-md-6 col-lg-6">
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
</template>

<script>
    import {getCalls, getGroups} from '../utils/api';

    export default {
        name: 'home',
        data: function () {
            return {
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
            this.$store.commit('showSpinner');

            const self = this;
            const [calls, error1] = await getCalls();
            const [groups, error2] = await getGroups();

            if (error1 == null && error2 == null) {
                this.$store.commit('hideSpinner');
                self.calls = calls;
                self.groups = groups;
            }

            this.selectedSeason = this.seasons[1].value;
        },
        methods: {
            openGroupSchedule: function () {
                const groupID = this.selectedGroup['id'];
                const url = `/schedule/${groupID}/${this.selectedSeason}`;
                this.$router.push(url);
            },
            resetGroup: function () {
                this.selectedGroup = null;
            }
        },
        computed: {
            ready: function () {
                return this.calls != false && this.groups != false;
            },
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
