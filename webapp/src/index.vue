<template>
  <div id="app" class="container">
    <div v-if="ready">
      <div type="button" v-on:click="bellsVisible = !bellsVisible" class="btn btn-default btn-block">
      Звонки
      </div>
      <transition name="vsu">
        <div v-if="bellsVisible" class="well">
          <div class="list-group">
            <div class="list-group-item" v-for="item, index in bells">
              <h4 class="list-group-item-heading">{{ index + 1 + " пара" }}</h4>
              <p class="list-group-item-text">{{ item[0] + " - " + item[1] }}</p>
            </div>
          </div>
        </div>
      </transition>
      <div v-on:click="groupsVisible = !groupsVisible" class="btn btn-default btn-block">
      Группы
      </div>
      <transition name="vsu">
        <div v-if="groupsVisible" class="well">
          <div class="form-group">
            <label for="groupSelector">Выберите группу</label>
            <select v-model="curGroupID" class="form-control" id="groupSelector">
              <option v-for="group_id, group in groups" v-bind:value="group_id">{{ group }}</option>
            </select>
          </div>
          <div class="btn-group btn-group-justified" data-toggle="buttons">
            <label class="btn btn-primary active" for="autumn">
              Осень
              <input type="radio" name="season" id="autumn" checked="true">
            </label>
            <label class="btn btn-primary" for="spring">
              Весна
              <input type="radio" name="season" id="spring">
            </label>
          </div><br />
          <a href="#" v-on:click="openGroupSchedule" v-bind:class="{disabled: curGroupID == null}" class="btn btn-success btn-block" role="button">Открыть расписание</a>
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
  data: function() {
    return {
      ready: false,
      bellsVisible: false,
      groupsVisible: false,
      curGroupID: null,
      season: '1',
      bells: [],
      groups: {}
    }
  },
  created: function() {
    const self = this
    parallel([
      callback => {
        $.ajax({
          url: "https://vyatsuschedule.herokuapp.com/vyatsu/bells",
          dataType: "json",
          success: (data) => {
            callback(null, data)
          }
        })
      },
      callback => {
        $.ajax({
          url: "https://vyatsuschedule.herokuapp.com/vyatsu/groups.json",
          dataType: "json",
          success: (data) => {
            callback(null, data)
          }
        })
      }
    ],
    (err, res) => {
      [self.bells, self.groups] = res
      self.ready = true
    })
  },
  methods: {
    openGroupSchedule: function() {
      const isAutumn = document.getElementById("autumn").checked
      const url = `/mobile/${this.curGroupID}/${isAutumn ? 'autumn' : 'spring'}`
      window.open(url, '_blank')
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
