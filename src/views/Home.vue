<template>
    <div class="home container">
        <div v-if="ready">
            <div v-on:click="callsVisible = !callsVisible" class="btn btn-default btn-block">
                Расписание звонков
            </div>
            <div v-if="callsVisible" class="well">
                <div class="list-group">
                    <div class="list-group-item" v-for="(item, index) in calls">
                        <h4 class="list-group-item-heading">{{ index + 1 + " пара" }}</h4>
                        <p class="list-group-item-text">{{ item[0] + " - " + item[1] }}</p>
                    </div>
                </div>
            </div>
            <div v-on:click="groupsVisible = !groupsVisible" class="btn btn-default btn-block">
                Расписание групп
            </div>
            <div v-if="groupsVisible" class="well">
                <div class="form-group">
                    <label for="facultySelector">Выберите факультет</label>
                    <select v-model="selectedFaculty" class="form-control" id="facultySelector">
                        <option v-for="faculty_item in groups" v-bind:value="faculty_item">{{ faculty_item['faculty'] }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="groupSelector">Выберите группу</label>
                    <select v-model="selectedGroup" class="form-control" id="groupSelector">
                        <option v-for="group_item in groupsByFaculty" v-bind:value="group_item">{{ group_item['name'] }}
                        </option>
                    </select>
                </div>
                <div class="btn-group btn-group-justified" data-toggle="buttons">
                    <label class="btn btn-primary" for="autumn">
                        Осень
                        <input type="radio" name="season" id="autumn">
                    </label>
                    <label class="btn btn-primary active" for="spring">
                        Весна
                        <input type="radio" name="season" id="spring" checked="checked">
                    </label>
                </div>
                <br/>
                <a href="#" v-on:click="openGroupSchedule" v-bind:class="{disabled: !isGroupSelected}"
                   class="btn btn-success btn-block" role="button">Открыть расписание</a>
            </div>
        </div>
        <div v-if="!ready">
            <h1 class="vsu-splashscreen">Расписание студентов ВятГУ</h1>
        </div>
    </div>
</template>

<script>
    import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

    const API_URL = 'https://vsuscheduleapi-dev.herokuapp.com';

    export default {
        name: 'home',
        data: function () {
            return {
                ready: false,
                callsVisible: false,
                groupsVisible: false,
                selectedGroup: null,
                selectedFaculty: null,
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
                const isAutumn = document.getElementById("autumn").checked;
                const groupID = this.selectedGroup['id'];
                const url = `/schedule/${groupID}/${isAutumn ? 'autumn' : 'spring'}`;
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
