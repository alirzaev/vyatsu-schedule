(function() {
	new Vue({
		el: '#app',
		data: {
			bellsVisible: false,
			groupsVisible: false,
			curGroupID: null,
			season: '1'
		},
		methods: {
			openGroupSchedule: function() {
				const isAutumn = document.getElementById("autumn").checked
				window.open(`/mobile/${this.curGroupID}/${isAutumn ? 'autumn' : 'spring'}`, '_blank')
		}
	}
})})()