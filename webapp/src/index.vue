<template>
    <div id="app" class="container">
        <div v-if="ready">
            <div v-on:click="callsVisible = !callsVisible" class="btn btn-default btn-block">
                Расписание звонков
            </div>
            <transition name="vsu">
                <div v-if="callsVisible" class="well">
                    <div class="list-group">
                        <div class="list-group-item" v-for="item, index in calls">
                            <h4 class="list-group-item-heading">{{ index + 1 + " пара" }}</h4>
                            <p class="list-group-item-text">{{ item[0] + " - " + item[1] }}</p>
                        </div>
                    </div>
                </div>
            </transition>
            <div v-on:click="groupsVisible = !groupsVisible" class="btn btn-default btn-block">
                Расписание групп
            </div>
            <transition name="vsu">
                <div v-if="groupsVisible" class="well">
                    <div class="form-group">
                        <label for="facultySelector">Выберите факультет</label>
                        <select v-model="selectedFaculty" class="form-control" id="facultySelector">
                            <option v-for="_, faculty_name in groups" v-bind:value="faculty_name">{{ faculty_name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="groupSelector">Выберите группу</label>
                        <select v-model="selectedGroup" class="form-control" id="groupSelector">
                            <option v-for="_, group_name in groupsByFaculty" v-bind:value="group_name">{{ group_name }}
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
            </transition>
        </div>
        <div v-if="!ready">
            <h1 class="vsu-splashscreen">Расписание студентов ВятГУ</h1>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import parallel from 'async/parallel'
    import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
    import bootstrapJS from 'bootstrap/dist/js/bootstrap.min.js'

    export default {
        name: 'app',
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
        created: function () {
            const self = this
            parallel([
                    callback => {
                        $.ajax({
                            url: "/vyatsu/calls",
                            dataType: "json",
                            success: (data) => {
                                callback(null, data)
                            }
                        })
                    },
                    callback => {
                        $.ajax({
                            url: "/vyatsu/groups/by_faculty.json",
                            dataType: "json",
                            success: (data) => {
                                callback(null, data)
                            }
                        })
                    }
                ],
                (err, res) => {
                    [self.calls, self.groups] = res
                    self.ready = true
                })
        },
        methods: {
            openGroupSchedule: function () {
                const isAutumn = document.getElementById("autumn").checked
                const groupID = this.groupsByFaculty[this.selectedGroup]
                const url = `/mobile/${groupID}/${isAutumn ? 'autumn' : 'spring'}`
                window.open(url, '_blank')
            }
        },
        computed: {
            groupsByFaculty: function () {
                this.selectedGroup = null
                return this.selectedFaculty ? this.groups[this.selectedFaculty] : []
            },
            isGroupSelected: function () {
                return this.selectedGroup !== null && this.selectedGroup !== undefined
            }
        }
    }
</script>

<style>
    #app {
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

    .vsu-enter-active, .vsu-leave-active {
        transition: opacity 0.3s;
    }

    .vsu-enter, .vsu-leave-to {
        opacity: 0;
    }
</style>
