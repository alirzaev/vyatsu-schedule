import './index.css'

(function () {
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
				const url = '/mobile/' + this.curGroupID + '/' + (isAutumn ? 'autumn' : 'spring')
				window.open(url, '_blank')
		}
	}
})})()