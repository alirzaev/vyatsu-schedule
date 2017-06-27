(function() {
new Vue({
  el: '#app',
  data: {
    bellsShown: false,
    groupsShown: false,
    curGroupID: null,
    season: '1'
  },
  methods: {
  	showBells: function() {
  		this.bellsShown = !this.bellsShown
  	},
  	showGroups: function() {
  		this.groupsShown = !this.groupsShown
  	},
  	openGroupSchedule: function() {
      const isAutumn = document.getElementById("autumn").checked
  		window.open(`https://www.vyatsu.ru/reports/schedule/Group/${this.curGroupID}_${isAutumn ? '1' : '2'}.html`, '_blank')
  	}
  }
})})()