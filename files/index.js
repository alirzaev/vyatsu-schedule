(function() {
new Vue({
  el: '#app',
  data: {
    bellsShown: false,
    groupsShown: false,
    curGroupID: null,
    season: '1',
    bells: [],
    groupsList: null
  },
  methods: {
  	showBells: function() {
  		const self = this
  		const showHideBells = () => self.bellsShown = ! self.bellsShown

  		if (self.bellsShown == false && self.bells.length == 0) {
	  		$.ajax({
	  			type: "GET",
	  			url: "vyatsu/bells",
	  			dataType: "json",
	  			success: (data) => {
	  				self.bells = data
	  				showHideBells()
	  			}
	  		})
	  	} else {
	  		showHideBells()
	  	}
  	},
  	showGroups: function() {
  		const self = this
  		const showHideGroups = () => self.groupsShown = ! self.groupsShown

  		if (self.groupsShown == false && self.groupsList == null) {
  			$.ajax({
  				type: "GET",
  				url: "vyatsu/groups.json",
  				dataType: "json",
  				success: (data) => {
  					self.groupsList = data
  					showHideGroups()
  				}
  			})
  		} else {
  			showHideGroups()
  		}
  	},
  	openGroupSchedule: function() {
      const isAutumn = document.getElementById("autumn").checked
  		window.open(`https://www.vyatsu.ru/reports/schedule/Group/${this.curGroupID}_${isAutumn ? '1' : '2'}.html`, '_blank')
  	}
  }
})})()