<template>
    <div class="home">
        <div v-if="!ready" class="vsu-splashscreen">
            <spinner></spinner>
            <h3 class="text-center">Расписание студентов ВятГУ</h3>
        </div>
        <div v-if="ready">
            <div class="container">
                <h3 class="text-center">Расписание групп</h3>
                <div class="well">
                    <div class="form-group">
                        <label for="facultySelector">Выберите факультет</label>
                        <select v-model="selectedFaculty" class="form-control" id="facultySelector">
                            <option v-for="faculty_item in groups" v-bind:value="faculty_item">{{
                                faculty_item['faculty'] }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="groupSelector">Выберите группу</label>
                        <select v-model="selectedGroup" class="form-control" id="groupSelector">
                            <option v-for="group_item in groupsByFaculty" v-bind:value="group_item">{{
                                group_item['name'] }}
                            </option>
                        </select>
                    </div>
                    <b-form-group>
                        <b-form-radio-group
                                v-model="season"
                                buttons
                                button-variant="primary"
                                id="autumn"
                                name="season"
                                :options="['autumn', 'spring']"
                                variant="primary"></b-form-radio-group>
                    </b-form-group>
                    <b-button variant="success" v-on:click="openGroupSchedule"
                              v-bind:class="{disabled: !isGroupSelected}"
                              class="w-100 mt-0">Открыть расписание
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from 'vue-simple-spinner'

    const API_URL = 'https://vsuscheduleapi-dev.herokuapp.com';

    export default {
        name: 'home',
        components: {
            spinner: Spinner
        },
        data: function () {
            return {
                ready: false,
                callsVisible: false,
                groupsVisible: false,
                selectedGroup: null,
                selectedFaculty: null,
                season: null,
                calls: [],
                groups: {}
            }
        },
        created: async function () {
            const self = this;
            const calls_res = await this.$http.get(`${API_URL}/static/v1/calls.json`);
            const groups_res = await this.$http.get(`${API_URL}/static/v2/groups/by_faculty.json`);

            if (calls_res.status === 200 && groups_res.status === 200) {
                self.calls = calls_res.data;
                self.groups = groups_res.data;
                self.ready = true;
            }
        },
        methods: {
            openGroupSchedule: function () {
                const groupID = this.selectedGroup['id'];
                const url = `/schedule/${groupID}/${this.season}`;
                this.$router.push(url);
            }
        },
        computed: {
            groupsByFaculty: function () {
                this.selectedGroup = null;
                return this.selectedFaculty ? this.selectedFaculty['groups'] : []
            },
            isGroupSelected: function () {
                return this.selectedGroup !== null && this.selectedGroup !== undefined
            }
        }
    }
</script>

<style scoped>
    .home {
        margin: auto;
        max-width: 768px;
        padding: 19px;
        font-family: 'Droid Sans', sans-serif;
    }

    .vsu-splashscreen {
        text-align: center;
        margin-top: 50%;
        display: block;
    }
</style>
