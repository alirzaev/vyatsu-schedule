const express = require('express')
const fs = require('fs')
const request = require('request')
const router = express.Router()

const DEBUG = process.env.NODE_ENV !== 'production'
const BASE_URL = DEBUG ? 'http://localhost:8080/' : 'http://vyatsushedule-vyatsuschedule.7e14.starter-us-west-2.openshiftapps.com/'

router.get('/mobile', (req, res) => {
	console.log('/mobile')

	const opts = { 'encoding': 'utf-8' }
	fs.readFile('resources/bells.json', opts, (_, bells_data) => {
		fs.readFile('resources/groups.json', opts, (_, groups_data) => {
			const bells = JSON.parse(bells_data)
			const groups = JSON.parse(groups_data)
			res.render('index', { bells: bells, groups: groups, debug: DEBUG })
		})
	})
})

router.get('/mobile/:group_id/:season', (req, res) => {
	console.log(`/mobile/${req.params.group_id}/${req.params.season}`)
	
	const opts = { 'encoding': 'utf-8' }
	const url = `${BASE_URL}vyatsu/schedule/${req.params.group_id}/${req.params.season}`
	request.get(url, (err, response, weeks_data) => {
		fs.readFile('resources/bells.json', opts, (_, bells_data) => {
			const bells = JSON.parse(bells_data)
			const weeks = JSON.parse(weeks_data)['weeks']
			res.render('schedule', { weeks: weeks, bells: bells })
		})
	})
})

module.exports = router